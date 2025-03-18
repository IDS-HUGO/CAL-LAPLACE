import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/laplace/';

export const getLaplaceTransform = async (expression) => {
  try {
    const response = await axios.get(`${API_URL}${encodeURIComponent(expression)}`, { timeout: 10000 });
    return response.data;
  } catch (error) {
    console.error('Error al conectar con la API:', error);
    return { error: 'No se pudo calcular la transformada de Laplace. Verifica la conexión.' };
  }
};
