from database import SessionDep
from fastapi import APIRouter
from schemas.student_schema import CourseInfo, StudentCreate, StudentRead, StudentUpdate
from services import course_service, student_service

# -V7: dependencies za zaštitu ruta
from core.dependencies import AdminUserDep, CurrentUserDep

router = APIRouter()


# -V7: admin kreira studente
@router.post("/", response_model=StudentRead)
def create_student(student: StudentCreate, session: SessionDep, _admin: AdminUserDep):
    return student_service.create_student(session, student)


# -V7: svi ulogovani mogu listati
@router.get("/", response_model=list[StudentRead])
def list_students(
    session: SessionDep, _user: CurrentUserDep, offset: int = 0, limit: int = 100
):
    return student_service.get_students(session, offset, limit)


# -V7: zaštićeno
@router.get("/{student_id}", response_model=StudentRead)
def get_student(student_id: int, session: SessionDep, _user: CurrentUserDep):
    return student_service.get_student(session, student_id)


# -V7: admin
@router.put("/{student_id}", response_model=StudentRead)
def update_student(
    student_id: int, student: StudentUpdate, session: SessionDep, _admin: AdminUserDep
):
    return student_service.update_student(session, student_id, student)


# -V7: admin
@router.delete("/{student_id}")
def delete_student(student_id: int, session: SessionDep, _admin: AdminUserDep):
    return student_service.delete_student(session, student_id)


# -V7: zaštićeno
@router.get("/{student_id}/courses", response_model=list[CourseInfo])
def list_student_courses(student_id: int, session: SessionDep, _user: CurrentUserDep):
    return course_service.get_courses_for_student(session, student_id)
