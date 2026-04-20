from fastapi import HTTPException
from models.user_model import User
from repositories import user_repository
from schemas.user_schema import UserCreate, UserUpdate
from sqlmodel import Session


def create_user(session: Session, data: UserCreate) -> User:
    if user_repository.get_by_username(session, data.username):
        raise HTTPException(status_code=400, detail="Username already taken")
    user = User.model_validate(data)
    return user_repository.create(session, user)


def get_users(session: Session, offset: int = 0, limit: int = 100) -> list[User]:
    return user_repository.get_all(session, offset, limit)


def get_user(session: Session, user_id: int) -> User:
    user = user_repository.get_by_id(session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def delete_user(session: Session, user_id: int) -> dict:
    user = get_user(session, user_id)
    user_repository.delete(session, user)
    return {"ok": True}


def update_user(session: Session, user_id: int, data: UserUpdate) -> User:
    user = get_user(session, user_id)
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
    return user_repository.update(session, user)
