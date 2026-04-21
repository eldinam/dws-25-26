from database import SessionDep
from fastapi import APIRouter
from schemas.user_schema import UserRead, UserUpdate
from services import user_service

# -V7: import dependencies za zaštitu ruta
from core.dependencies import AdminUserDep, CurrentUserDep

router = APIRouter()


# -V7: POST / je uklonjen — registracija se sada radi preko /auth/register


# -V7: samo admin može listati sve user-e
@router.get("/", response_model=list[UserRead])
def list_users(session: SessionDep, _admin: AdminUserDep, offset: int = 0, limit: int = 100):
    return user_service.get_users(session, offset, limit)


# -V7: svaki autentikovani user može čitati profil (dodatna provjera u service-u opcionalna)
@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, session: SessionDep, _user: CurrentUserDep):
    return user_service.get_user(session, user_id)


# -V7: za sada — samo admin mijenja user-e (kasnije možemo: vlasnik + admin)
@router.put("/{user_id}", response_model=UserRead)
def update_user(
    user_id: int, user: UserUpdate, session: SessionDep, _admin: AdminUserDep
):
    return user_service.update_user(session, user_id, user)


# -V7: samo admin briše user-e
@router.delete("/{user_id}")
def delete_user(user_id: int, session: SessionDep, _admin: AdminUserDep):
    return user_service.delete_user(session, user_id)
