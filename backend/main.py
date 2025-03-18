from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.laplace import laplace_router

app = FastAPI()

# Configurar CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las IPs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas de transformadas de Laplace
app.include_router(laplace_router)

@app.get("/")
def home():
    return {"message": "API de Transformadas de Laplace"}

