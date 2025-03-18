from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.laplace import laplace_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(laplace_router)

@app.get("/")
def home():
    return {"message": "API de Transformadas de Laplace"}

