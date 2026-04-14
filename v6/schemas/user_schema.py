from typing import Optional

from sqlmodel import SQLModel


class UserBase(SQLModel):
    username: str
    email: str
    full_name: Optional[str] = None


class UserCreate(UserBase):
    pass


class UserUpdate(SQLModel):
    username: Optional[str] = None
    email: Optional[str] = None
    full_name: Optional[str] = None


class UserRead(UserBase):
    id: int
