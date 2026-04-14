from contextlib import asynccontextmanager

from controllers import student_controller, user_controller
from database import engine
from fastapi import FastAPI
from sqlmodel import SQLModel


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(student_controller.router, prefix="/students", tags=["Students"])
app.include_router(user_controller.router, prefix="/users", tags=["Users"])


@app.get("/")
def index():
    return {"status": "ok"}
