from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from models.student_model import Student


class Course(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    student_id: int = Field(foreign_key="student.id")

    student: Optional["Student"] = Relationship(back_populates="courses")
