from typing import Optional

from sqlmodel import SQLModel


class CourseInfo(SQLModel):
    """Plitki prikaz kursa — koristi se unutar StudentRead"""
    id: int
    title: str
    description: Optional[str] = None
    student_id: int


class StudentBase(SQLModel):
    name: str
    age: int
    nickname: Optional[str] = None


class StudentCreate(StudentBase):
    pass


class StudentUpdate(SQLModel):
    name: Optional[str] = None
    age: Optional[int] = None
    nickname: Optional[str] = None


class StudentRead(StudentBase):
    id: int
    courses: list[CourseInfo] = []
