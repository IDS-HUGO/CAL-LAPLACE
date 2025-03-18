import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registramos los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Función para convertir las expresiones matemáticas a una forma evaluable en JavaScript
const parseMathFunction = (func) => {
  // Reemplazamos las funciones matemáticas para hacerlas compatibles con JavaScript
  return func
    .replace(/sin\(([^)]+)\)/g, "Math.sin($1)")
    .replace(/cos\(([^)]+)\)/g, "Math.cos($1)")
    .replace(/tan\(([^)]+)\)/g, "Math.tan($1)")
    .replace(/exp\(([^)]+)\)/g, "Math.exp($1)")
    .replace(/log\(([^)]+)\)/g, "Math.log($1)")
    .replace(/e\^([^\)]+)/g, "Math.exp($1)")
    .replace(/(\d+)\/\(([^)]+)\)/g, "$1/($2)");
};

// Función para generar valores de la función y su transformada de Laplace (simulada aquí)
const generateGraphData = (originalFunction) => {
  const xValues = [0, 1, 2, 3, 4]; // Eje X (tiempo o frecuencia)
  const yValuesOriginal = xValues.map((x) => {
    try {
      // Evaluamos la función original usando eval
      return eval(parseMathFunction(originalFunction.replace("t", x)));
    } catch (error) {
      return 0; // Si hay un error, retornamos 0
    }
  });

  // Simulamos la transformada de Laplace con una función para demostración (esto debería reemplazarse con el cálculo real)
  const yValuesLaplace = yValuesOriginal.map((y) => y * Math.exp(-y)); // Ejemplo de transformada

  return { xValues, yValuesOriginal, yValuesLaplace };
};

const LaplaceGraph = ({ laplaceData }) => {
  if (!laplaceData) return null;

  const { originalFunction, laplaceFunction } = laplaceData;

  // Generamos los datos del gráfico
  const { xValues, yValuesOriginal, yValuesLaplace } = generateGraphData(originalFunction);

  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: `Función Original: ${originalFunction}`,
        data: yValuesOriginal,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: `Transformada de Laplace de: ${originalFunction}`,
        data: yValuesLaplace,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Gráfico de la Transformada de Laplace: ${laplaceFunction}`,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LaplaceGraph;