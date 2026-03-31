from contextlib import asynccontextmanager
from typing import Annotated

from cruds import student_crud
from database import engine
from fastapi import Depends, FastAPI
from schemas.student_schema import StudentCreate, StudentRead, StudentUpdate
from sqlmodel import Session, SQLModel


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/")
def index():
    return {"status": "ok"}


@app.post("/student/", response_model=StudentRead)
def create_student(student: StudentCreate, session: SessionDep):
    return student_crud.create_student(session, student)


@app.get("/student-list/", response_model=list[StudentRead])
def student_list(session: SessionDep, offset: int = 0, limit: int = 100):
    return student_crud.get_students(session, offset, limit)


@app.get("/student/{student_id}", response_model=StudentRead)
def get_student(student_id: int, session: SessionDep):
    return student_crud.get_student(session, student_id)


@app.delete("/student/{student_id}")
def delete_student(student_id: int, session: SessionDep):
    return student_crud.delete_student(session, student_id)


@app.put("/student/{student_id}", response_model=StudentRead)
def update_student(student_id: int, student: StudentUpdate, session: SessionDep):
    return student_crud.update_student(session, student_id, student)
