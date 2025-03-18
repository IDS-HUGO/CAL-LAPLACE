from services.solver import compute_laplace

def test_laplace():
    """Pruebas unitarias para verificar la transformada de Laplace"""
    assert compute_laplace("t") == "1/s**2"
    assert compute_laplace("exp(-2*t)") == "1/(s + 2)"
    assert compute_laplace("sin(t)") == "1/(s**2 + 1)"
    assert compute_laplace("cos(t)") == "s/(s**2 + 1)"
