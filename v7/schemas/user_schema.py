from typing import Optional

from sqlmodel import SQLModel


class UserBase(SQLModel):
    username: str
    email: str
    full_name: Optional[str] = None


# -V7: UserCreate sada zahtijeva lozinku (koristimo ga i za registraciju)
class UserCreate(UserBase):
    password: str


# -V7: šema za login zahtjev
class UserLogin(SQLModel):
    username: str
    password: str


# -V7: šema odgovora na uspješan login — vraćamo JWT
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# -V7: podaci koje čuvamo u JWT payloadu (kasnije ih dekodiramo)
class TokenData(SQLModel):
    username: Optional[str] = None


class UserUpdate(SQLModel):
    username: Optional[str] = None
    email: Optional[str] = None
    full_name: Optional[str] = None


# Napomena: UserRead NIKAD ne sadrži password/hashed_password
class UserRead(UserBase):
    id: int
    # -V7: klijent smije znati je li user admin (za UI)
    is_admin: bool
