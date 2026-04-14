from fastapi import HTTPException
from models.student_model import Student
from schemas.student_schema import StudentCreate, StudentUpdate
from sqlmodel import Session, select


def create_student(session: Session, student: StudentCreate):
    db_student = Student.model_validate(student)

    session.add(db_student)
    session.commit()
    session.refresh(db_student)

    return db_student


def get_students(session: Session, offset: int = 0, limit: int = 100):
    statement = select(Student).offset(offset).limit(limit)
    return session.exec(statement).all()


def get_student(session: Session, student_id: int):
    student = session.get(Student, student_id)

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


def delete_student(session: Session, student_id: int):
    student = session.get(Student, student_id)

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    session.delete(student)
    session.commit()

    return {"ok": True}


def update_student(session: Session, student_id: int, student: StudentUpdate):
    db_student = session.get(Student, student_id)

    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")

    student_data = student.model_dump(exclude_unset=True)

    for key, value in student_data.items():
        setattr(db_student, key, value)

    session.add(db_student)
    session.commit()
    session.refresh(db_student)

    return db_student
