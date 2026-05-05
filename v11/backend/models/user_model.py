from typing import Optional

from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    full_name: Optional[str] = None
    # -V7: hash lozinke — NIKAD ne čuvamo lozinku u plain tekstu
    hashed_password: str
    # -V7: flag za role-based zaštitu (admin rute)
    is_admin: bool = Field(default=False)
