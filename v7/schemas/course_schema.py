from typing import Optional

from sqlmodel import SQLModel


class StudentInfo(SQLModel):
    """Plitki prikaz studenta — koristi se unutar CourseRead"""
    id: int
    name: str
    age: int
    nickname: Optional[str] = None


class CourseBase(SQLModel):
    title: str
    description: Optional[str] = None
    student_id: int


class CourseCreate(CourseBase):
    pass


class CourseUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    student_id: Optional[int] = None


class CourseRead(CourseBase):
    id: int
    student: Optional[StudentInfo] = None
