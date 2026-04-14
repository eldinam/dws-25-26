from models.user_model import User
from sqlmodel import Session, select


def create(session: Session, user: User) -> User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def get_all(session: Session, offset: int = 0, limit: int = 100) -> list[User]:
    statement = select(User).offset(offset).limit(limit)
    return session.exec(statement).all()


def get_by_id(session: Session, user_id: int) -> User | None:
    return session.get(User, user_id)


def get_by_username(session: Session, username: str) -> User | None:
    statement = select(User).where(User.username == username)
    return session.exec(statement).first()


def delete(session: Session, user: User) -> None:
    session.delete(user)
    session.commit()


def update(session: Session, user: User) -> User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
