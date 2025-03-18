import React, { useState } from "react"; 
import { getLaplaceTransform } from "../services/api";

const LaplaceCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const calculateLaplace = async () => {
    setResult("");
    setError("");

    if (!expression.trim()) {
      setError("Ingresa una función válida.");
      return;
    }

    try {
      const response = await getLaplaceTransform(expression);
      if (response.error) {
        setError(response.error);
      } else {
        setResult(response.laplace_transform);
      }
    } catch (error) {
      setError("Hubo un problema al conectar con la API.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Calculadora de Transformadas de Laplace</h2>

      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Ejemplo: t, sin(t), exp(-2*t)"
        />
        <button className="btn btn-primary" onClick={calculateLaplace}>
          Calcular
        </button>
      </div>

      {result && <div className="alert alert-success"><strong>Resultado:</strong> {result}</div>}
      {error && <div className="alert alert-danger"><strong>Error:</strong> {error}</div>}
    </div>
  );
};

export default LaplaceCalculator;
