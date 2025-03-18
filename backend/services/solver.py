from sympy import laplace_transform, symbols, sympify

def compute_laplace(expression: str):
    """
    Calcula la transformada de Laplace de una expresión matemática.
    """
    try:
        s, t = symbols("s t")
        expr = sympify(expression)  # Convertir a expresión simbólica
        result = laplace_transform(expr, t, s)[0]  # Obtener solo el resultado
        return str(result)
    except Exception as e:
        return f"Error al calcular la transformada: {str(e)}"
