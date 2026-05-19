# -V7 (novi fajl): logika za registraciju i login
from core.security import create_access_token, verify_password
from fastapi import HTTPException, status
from models.user_model import User
from repositories import user_repository
from schemas.user_schema import Token, UserCreate
from services import user_service
from sqlmodel import Session


def register_user(session: Session, data: UserCreate) -> User:
    """Registracija = kreiranje user-a sa hash-ovanom lozinkom."""
    # Delegiramo na user_service (koji hash-uje i provjerava unikate)
    return user_service.create_user(session, data)


def authenticate_user(session: Session, username: str, password: str) -> User:
    """Vraća user-a ako su kredencijali ispravni, inače baca 401."""
    user = user_repository.get_by_username(session, username)
    # Ista poruka za "nema usera" i "pogrešna lozinka" — ne curi info napadaču
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def login_user(session: Session, username: str, password: str) -> Token:
    """Provjeri kredencijale i vrati JWT."""
    user = authenticate_user(session, username, password)
    # `sub` (subject) je standardni JWT claim — stavljamo username
    access_token = create_access_token(data={"sub": user.username})
    return Token(access_token=access_token, token_type="bearer")
