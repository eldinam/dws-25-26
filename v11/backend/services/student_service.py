from fastapi import HTTPException
from models.student_model import Student
from repositories import student_repository
from schemas.student_schema import StudentCreate, StudentUpdate
from sqlmodel import Session


def create_student(session: Session, data: StudentCreate) -> Student:
    student = Student.model_validate(data)
    return student_repository.create(session, student)


def get_students(session: Session, offset: int = 0, limit: int = 100) -> list[Student]:
    return student_repository.get_all(session, offset, limit)


def get_student(session: Session, student_id: int) -> Student:
    student = student_repository.get_by_id(session, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


def delete_student(session: Session, student_id: int) -> dict:
    student = get_student(session, student_id)
    student_repository.delete(session, student)
    return {"ok": True}


def update_student(session: Session, student_id: int, data: StudentUpdate) -> Student:
    student = get_student(session, student_id)
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(student, key, value)
    return student_repository.update(session, student)
