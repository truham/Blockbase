import axios from "axios";
import { Coin } from "../types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCoins = async (): Promise<Coin[]> => {
  console.log("Fetching coins from:", `${apiUrl}/api/coins`);
  const response = await axios.get(`${apiUrl}/api/coins`);
  return response.data;
};

export const getCoin = async (id: string): Promise<Coin> => {
  const response = await axios.get(`${apiUrl}/api/coins/${id}`);
  return response.data;
};

export const getCoinHistory = async (id: string): Promise<any> => {
  const response = await axios.get(`${apiUrl}/api/coins/${id}/history`);
  return response.data;
};
