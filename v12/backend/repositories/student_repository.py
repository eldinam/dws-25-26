from models.student_model import Student
from sqlmodel import Session, select


def create(session: Session, student: Student) -> Student:
    session.add(student)
    session.commit()
    session.refresh(student)
    return student


def get_all(session: Session, offset: int = 0, limit: int = 100) -> list[Student]:
    statement = select(Student).offset(offset).limit(limit)
    return session.exec(statement).all()


def get_by_id(session: Session, student_id: int) -> Student | None:
    return session.get(Student, student_id)


def delete(session: Session, student: Student) -> None:
    session.delete(student)
    session.commit()


def update(session: Session, student: Student) -> Student:
    session.add(student)
    session.commit()
    session.refresh(student)
    return student
