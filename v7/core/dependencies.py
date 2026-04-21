# -V7 (novi fajl): FastAPI dependencies za zaštitu ruta
from typing import Annotated

from core.security import decode_access_token
from database import SessionDep
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from models.user_model import User
from repositories import user_repository

# tokenUrl govori Swagger-u gdje je login endpoint (za "Authorize" dugme)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_current_user(
    session: SessionDep,
    token: Annotated[str, Depends(oauth2_scheme)],
) -> User:
    """Dekodira JWT iz Authorization headera i vrati User-a iz baze."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception

    username: str | None = payload.get("sub")
    if username is None:
        raise credentials_exception

    user = user_repository.get_by_username(session, username)
    if user is None:
        raise credentials_exception
    return user


# Prečica za tip — umjesto da svaki put pišemo Annotated[User, Depends(...)]
CurrentUserDep = Annotated[User, Depends(get_current_user)]


def get_current_admin(current_user: CurrentUserDep) -> User:
    """Dozvoljava pristup samo admin-ima."""
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return current_user


AdminUserDep = Annotated[User, Depends(get_current_admin)]
