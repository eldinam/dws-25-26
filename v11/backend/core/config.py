# -V7 (novi fajl): centralne postavke aplikacije
# U produkciji se SECRET_KEY mora čitati iz environment varijabli (.env),
# nikad ne ide u git. Ovdje je hardkodiran radi jednostavnosti.
import os

# Generiše se jednom komandom: `openssl rand -hex 32`
SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "tajni-kljuc-samo-za-razvoj-promijeniti-u-produkciji",
)

# Algoritam za potpisivanje JWT-a (HMAC SHA-256)
ALGORITHM = "HS256"

# Koliko dugo traje access token (u minutama)
ACCESS_TOKEN_EXPIRE_MINUTES = 60
