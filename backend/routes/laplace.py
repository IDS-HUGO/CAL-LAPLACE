from fastapi import APIRouter
from services.solver import compute_laplace

laplace_router = APIRouter()

@laplace_router.get("/laplace/{expr}")
def get_laplace(expr: str):
    """Endpoint para calcular la transformada de Laplace"""
    try:
        result = compute_laplace(expr)
        return {"input": expr, "laplace_transform": result}
    except Exception as e:
        return {"error": str(e)}
