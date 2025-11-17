import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Lokal; ändere zu Production-URL später

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/dashboard`); // Ersetze mit deinem Endpoint, z.B. /api/instruments
    return response.data; // Angenommen, data ist ein Objekt wie { message: "Hallo vom Backend!" } oder Array
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};