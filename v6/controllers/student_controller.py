from database import SessionDep
from fastapi import APIRouter
from schemas.student_schema import StudentCreate, StudentRead, StudentUpdate
from services import student_service

router = APIRouter()


@router.post("/", response_model=StudentRead)
def create_student(student: StudentCreate, session: SessionDep):
    return student_service.create_student(session, student)


@router.get("/", response_model=list[StudentRead])
def list_students(session: SessionDep, offset: int = 0, limit: int = 100):
    return student_service.get_students(session, offset, limit)


@router.get("/{student_id}", response_model=StudentRead)
def get_student(student_id: int, session: SessionDep):
    return student_service.get_student(session, student_id)


@router.put("/{student_id}", response_model=StudentRead)
def update_student(student_id: int, student: StudentUpdate, session: SessionDep):
    return student_service.update_student(session, student_id, student)


@router.delete("/{student_id}")
def delete_student(student_id: int, session: SessionDep):
    return student_service.delete_student(session, student_id)
