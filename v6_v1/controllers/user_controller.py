from database import SessionDep
from fastapi import APIRouter
from schemas.user_schema import UserCreate, UserRead, UserUpdate
from services import user_service

router = APIRouter()


@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: SessionDep):
    return user_service.create_user(session, user)


@router.get("/", response_model=list[UserRead])
def list_users(session: SessionDep, offset: int = 0, limit: int = 100):
    return user_service.get_users(session, offset, limit)


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, session: SessionDep):
    return user_service.get_user(session, user_id)


@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, user: UserUpdate, session: SessionDep):
    return user_service.update_user(session, user_id, user)


@router.delete("/{user_id}")
def delete_user(user_id: int, session: SessionDep):
    return user_service.delete_user(session, user_id)
