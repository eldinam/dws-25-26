from database import Base
from sqlalchemy import Boolean, Column, Integer, String


class City(Base):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    zip_code = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
