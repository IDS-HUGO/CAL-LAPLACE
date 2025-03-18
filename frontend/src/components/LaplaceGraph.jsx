import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const parseMathFunction = (func) => {
  return func
    .replace(/sin\(([^)]+)\)/g, "Math.sin($1)")
    .replace(/cos\(([^)]+)\)/g, "Math.cos($1)")
    .replace(/tan\(([^)]+)\)/g, "Math.tan($1)")
    .replace(/exp\(([^)]+)\)/g, "Math.exp($1)")
    .replace(/log\(([^)]+)\)/g, "Math.log($1)")
    .replace(/e\^([^\)]+)/g, "Math.exp($1)")
    .replace(/(\d+)\/\(([^)]+)\)/g, "$1/($2)");
};

const generateGraphData = (originalFunction) => {
  const xValues = [0, 1, 2, 3, 4];
  const yValuesOriginal = xValues.map((x) => {
    try {
      return eval(parseMathFunction(originalFunction.replace("t", x)));
    } catch (error) {
      return 0; // Si hay un error, retornamos 0
    }
  });

  const yValuesLaplace = yValuesOriginal.map((y) => y * Math.exp(-y));

  return { xValues, yValuesOriginal, yValuesLaplace };
};

const LaplaceGraph = ({ laplaceData }) => {
  if (!laplaceData) return null;

  const { originalFunction, laplaceFunction } = laplaceData;

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