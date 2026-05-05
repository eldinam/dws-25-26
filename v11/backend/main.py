from contextlib import asynccontextmanager

# -V7: uvozimo i auth_controller
from controllers import (
    auth_controller,
    course_controller,
    student_controller,
    user_controller,
)
from database import engine
from fastapi import FastAPI

# -V7: CORS middleware da frontend (drugi origin) može zvati API
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

# -V7: dozvoljavamo lokalne dev origin-e (Vite=5173, CRA=3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -V7: auth rute (javne: register/login, zaštićena: me)
app.include_router(auth_controller.router, prefix="/auth", tags=["Auth"])
app.include_router(student_controller.router, prefix="/students", tags=["Students"])
app.include_router(user_controller.router, prefix="/users", tags=["Users"])
app.include_router(course_controller.router, prefix="/courses", tags=["Courses"])


@app.get("/")
def index():
    return {"status": "ok"}
