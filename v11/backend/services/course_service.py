from fastapi import HTTPException
from models.course_model import Course
from repositories import course_repository, student_repository
from schemas.course_schema import CourseCreate, CourseUpdate
from sqlmodel import Session


def _ensure_student_exists(session: Session, student_id: int) -> None:
    if not student_repository.get_by_id(session, student_id):
        raise HTTPException(status_code=404, detail="Student not found")


def create_course(session: Session, data: CourseCreate) -> Course:
    _ensure_student_exists(session, data.student_id)
    course = Course.model_validate(data)
    return course_repository.create(session, course)


def get_courses(session: Session, offset: int = 0, limit: int = 100) -> list[Course]:
    return course_repository.get_all(session, offset, limit)


def get_course(session: Session, course_id: int) -> Course:
    course = course_repository.get_by_id(session, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


def get_courses_for_student(session: Session, student_id: int) -> list[Course]:
    _ensure_student_exists(session, student_id)
    return course_repository.get_by_student(session, student_id)


def delete_course(session: Session, course_id: int) -> dict:
    course = get_course(session, course_id)
    course_repository.delete(session, course)
    return {"ok": True}


def update_course(session: Session, course_id: int, data: CourseUpdate) -> Course:
    course = get_course(session, course_id)
    update_data = data.model_dump(exclude_unset=True)
    if "student_id" in update_data:
        _ensure_student_exists(session, update_data["student_id"])
    for key, value in update_data.items():
        setattr(course, key, value)
    return course_repository.update(session, course)
