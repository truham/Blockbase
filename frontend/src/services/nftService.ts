import axios from "axios";
import { RawNFTResponse } from "../types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getNFTs = async (
  walletAddress: string
): Promise<RawNFTResponse> => {
  const response = await axios.get(`${apiUrl}/api/nfts-for-owner`, {
    params: { walletAddress },
  });

  return response.data;
};
