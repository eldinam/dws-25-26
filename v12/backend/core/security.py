# -V7 (novi fajl): pomoćne funkcije za lozinke i JWT tokene
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from core.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY
from jose import JWTError, jwt

# bcrypt ima ograničenje: lozinka max 72 bajta (istorijski dizajn algoritma).
# Duže lozinke nema smisla slati — skratimo.
_BCRYPT_MAX_BYTES = 72


def hash_password(password: str) -> str:
    """Hashira plain lozinku prije čuvanja u bazu. Bcrypt sam generiše salt."""
    pwd_bytes = password.encode("utf-8")[:_BCRYPT_MAX_BYTES]
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Poredi plain lozinku sa hash-om iz baze. bcrypt iz hash-a izvadi salt."""
    pwd_bytes = plain_password.encode("utf-8")[:_BCRYPT_MAX_BYTES]
    return bcrypt.checkpw(pwd_bytes, hashed_password.encode("utf-8"))


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Kreira potpisan JWT token. `data` će postati payload (npr. {"sub": username})."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    # `exp` je standardni JWT claim — biblioteka će ga provjeriti automatski
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> Optional[dict]:
    """Dekodira i verifikuje JWT. Vraća payload ili None ako je nevažeći/istekao."""
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
