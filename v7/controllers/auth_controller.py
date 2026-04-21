# -V7 (novi fajl): rute za registraciju, login i trenutnog user-a
from typing import Annotated

from core.dependencies import CurrentUserDep
from database import SessionDep
from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from schemas.user_schema import Token, UserCreate, UserRead
from services import auth_service

router = APIRouter()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(data: UserCreate, session: SessionDep):
    """Javna registracija — kreira user-a sa hash-ovanom lozinkom."""
    return auth_service.register_user(session, data)


@router.post("/login", response_model=Token)
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDep,
):
    """OAuth2PasswordRequestForm = form-data sa poljima `username` i `password`.
    Swagger UI "Authorize" dugme koristi upravo ovaj format."""
    return auth_service.login_user(session, form_data.username, form_data.password)


@router.get("/me", response_model=UserRead)
def read_me(current_user: CurrentUserDep):
    """Vraća podatke o trenutno ulogovanom user-u."""
    return current_user
