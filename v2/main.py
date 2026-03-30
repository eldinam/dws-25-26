from fastapi import FastAPI
from get_blog_list import get_blog_list

app = FastAPI()


@app.get("/")
def index():
    return {"data": {"name": "Web programiranje II", "year": "2025/2026"}}


@app.get("/list/blog")
def daj_listu():
    blog_list = get_blog_list()
    return blog_list


@app.get("/blog/{id}")
def blog_item(id: int):
    blog_list = get_blog_list()

    print(id)

    if id < 1 or id > len(blog_list):
        return "Greškaaaaaaaa"

    return blog_list[id - 1]


@app.get("/blog/{id}/unpublished")
def blog_item_unpublished(id: int):
    return {"status": "Unpublished", "title": "test"}
