from pathlib import Path
from typing import Annotated

from sqlmodel import create_engine

BASE_DIR = Path(__file__).resolve().parent.parent
sqlite_file_name = BASE_DIR / "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)
