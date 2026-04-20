from models.course_model import Course
from sqlmodel import Session, select


def create(session: Session, course: Course) -> Course:
    session.add(course)
    session.commit()
    session.refresh(course)
    return course


def get_all(session: Session, offset: int = 0, limit: int = 100) -> list[Course]:
    statement = select(Course).offset(offset).limit(limit)
    return session.exec(statement).all()


def get_by_id(session: Session, course_id: int) -> Course | None:
    return session.get(Course, course_id)


def get_by_student(session: Session, student_id: int) -> list[Course]:
    statement = select(Course).where(Course.student_id == student_id)
    return session.exec(statement).all()


def delete(session: Session, course: Course) -> None:
    session.delete(course)
    session.commit()


def update(session: Session, course: Course) -> Course:
    session.add(course)
    session.commit()
    session.refresh(course)
    return course
