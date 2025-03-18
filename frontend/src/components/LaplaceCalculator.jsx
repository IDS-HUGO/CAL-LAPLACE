import React, { useState } from "react";
import { getLaplaceTransform } from "../services/api";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import LaplaceHistory from "./LaplaceHistory";
import LaplaceGraph from "./LaplaceGraph";

const LaplaceCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [laplaceData, setLaplaceData] = useState(null);

  const mathJaxConfig = {
    loader: { load: ["input/asciimath", "output/chtml"] },
    asciimath: { delimiters: [["$$", "$$"]] },
  };

  const formatResult = (rawResult) => {
    let formatted = rawResult.replace(/\*\*(-?\d+)/g, "^{ $1 }");
    formatted = formatted.replace(/(\d+)\/\(([^)]+)\)/g, "\\frac{$1}{$2}");
    formatted = formatted.replace(/([^\d\s])\(([^)]+)\)\/I/g, "$1\\frac{$2}{I}");
    formatted = formatted.replace(/e\*\((-?[\d\.]+)\)/g, "e^{(-$1)}");
    formatted = formatted.replace(/sin\(([^)]+)\)/g, "\\sin($1)");
    formatted = formatted.replace(/cos\(([^)]+)\)/g, "\\cos($1)");
    formatted = formatted.replace(/tan\(([^)]+)\)/g, "\\tan($1)");
    return `\\(${formatted}\\)`;
  };

  const calculateLaplace = async () => {
    setResult("");
    setError("");
    setLaplaceData(null);

    if (!expression.trim()) {
      setError("Ingresa una función válida.");
      return;
    }

    try {
      const response = await getLaplaceTransform(expression);
      if (response.error) {
        setError(response.error);
      } else {
        const formattedResult = formatResult(response.laplace_transform);
        setResult(formattedResult);

        setLaplaceData({
          originalFunction: expression,
          laplaceFunction: response.laplace_transform,
        });

        setHistory([
          ...history,
          { expression: expression, result: formattedResult },
        ]);
      }
    } catch (error) {
      setError("Hubo un problema al conectar con la API.");
    }
  };

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="container">
        <h2 className="title">Calculadora de Transformadas de Laplace</h2>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Ejemplo: t, sin(t), exp(-2*t)"
          />
          <button className="btn" onClick={calculateLaplace}>
            Calcular
          </button>
        </div>

        {result && (
          <div className="alert alert-success">
            <strong>Resultado:</strong> <MathJax>{result}</MathJax>
          </div>
        )}
        {error && <div className="alert alert-danger"><strong>Error:</strong> {error}</div>}

        <LaplaceGraph laplaceData={laplaceData} />

        <div className="history-section">
          <h3>Historial de Cálculos</h3>
          <div className="history-list">
            <LaplaceHistory history={history} />
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default LaplaceCalculator;