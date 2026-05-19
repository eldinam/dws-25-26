from database import SessionDep
from fastapi import APIRouter
from schemas.course_schema import CourseCreate, CourseRead, CourseUpdate
from services import course_service

# -V7: dependencies za zaštitu ruta
from core.dependencies import AdminUserDep, CurrentUserDep

router = APIRouter()


# -V7: pisanje zahtijeva admin role
@router.post("/", response_model=CourseRead)
def create_course(course: CourseCreate, session: SessionDep, _admin: AdminUserDep):
    return course_service.create_course(session, course)


# -V7: čitanje zahtijeva samo da je user ulogovan
@router.get("/", response_model=list[CourseRead])
def list_courses(
    session: SessionDep, _user: CurrentUserDep, offset: int = 0, limit: int = 100
):
    return course_service.get_courses(session, offset, limit)


# -V7: zaštićeno
@router.get("/{course_id}", response_model=CourseRead)
def get_course(course_id: int, session: SessionDep, _user: CurrentUserDep):
    return course_service.get_course(session, course_id)


# -V7: admin
@router.put("/{course_id}", response_model=CourseRead)
def update_course(
    course_id: int, course: CourseUpdate, session: SessionDep, _admin: AdminUserDep
):
    return course_service.update_course(session, course_id, course)


# -V7: admin
@router.delete("/{course_id}")
def delete_course(course_id: int, session: SessionDep, _admin: AdminUserDep):
    return course_service.delete_course(session, course_id)
