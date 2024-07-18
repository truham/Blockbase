import axios from "axios";
import { Coin } from "../types";

export const getCoins = async (): Promise<Coin[]> => {
  const response = await axios.get("http://localhost:5000/api/coins");
  return response.data;
};

export const getCoin = async (id: string): Promise<Coin> => {
  const response = await axios.get(`http://localhost:5000/api/coins/${id}`);
  return response.data;
};

export const getCoinHistory = async (id: string): Promise<any> => {
  const response = await axios.get(
    `http://localhost:5000/api/coins/${id}/history`
  );
  return response.data;
};
