from fastapi import FastAPI

from database import Base, SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def index():
    return {"data": {"name": "Web programiranje II", "year": "2025/2026"}}
