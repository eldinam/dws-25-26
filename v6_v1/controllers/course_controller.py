from database import SessionDep
from fastapi import APIRouter
from schemas.course_schema import CourseCreate, CourseRead, CourseUpdate
from services import course_service

router = APIRouter()


@router.post("/", response_model=CourseRead)
def create_course(course: CourseCreate, session: SessionDep):
    return course_service.create_course(session, course)


@router.get("/", response_model=list[CourseRead])
def list_courses(session: SessionDep, offset: int = 0, limit: int = 100):
    return course_service.get_courses(session, offset, limit)


@router.get("/{course_id}", response_model=CourseRead)
def get_course(course_id: int, session: SessionDep):
    return course_service.get_course(session, course_id)


@router.put("/{course_id}", response_model=CourseRead)
def update_course(course_id: int, course: CourseUpdate, session: SessionDep):
    return course_service.update_course(session, course_id, course)


@router.delete("/{course_id}")
def delete_course(course_id: int, session: SessionDep):
    return course_service.delete_course(session, course_id)
