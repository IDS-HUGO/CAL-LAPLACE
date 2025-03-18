import React from "react";
import { MathJax } from "better-react-mathjax";

const LaplaceHistory = ({ history }) => {
  return (
    <div className="my-4">
      <h4>Historial de Cálculos</h4>
      <ul className="list-group">
        {history.length === 0 ? (
          <li className="list-group-item">No hay cálculos previos.</li>
        ) : (
          history.map((item, index) => (
            <li key={index} className="list-group-item">
              <strong>Entrada:</strong> {item.expression} <br />
              <strong>Resultado:</strong> <MathJax>{item.result}</MathJax>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LaplaceHistory;