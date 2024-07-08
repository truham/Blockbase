import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getCoins = async (perPage: number = 10) => {
  const response = await axios.get(`${API_BASE_URL}/coins`, {
    params: { per_page: perPage },
  });
  return response.data;
};

export const getCoin = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/coins/${id}`);
  return response.data;
};

export const getCoinHistory = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/coins/${id}/history`);
  return response.data;
};
