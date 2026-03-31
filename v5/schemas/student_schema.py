from typing import Optional
from sqlmodel import SQLModel


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
