import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getNFTs = async (
  address: string,
  pageKey?: string,
  limit: number = 20
) => {
  const response = await axios.get(`${apiUrl}/api/nfts-for-owner`, {
    params: {
      walletAddress: address,
      pageKey,
      limit,
    },
  });
  return response.data;
};

export const getNFTsForContract = async (
  contractAddress: string,
  startToken?: string,
  limit: number = 50
) => {
  const response = await axios.get(`${apiUrl}/api/nfts-for-contract`, {
    params: {
      contractAddress,
      startToken,
      limit,
    },
  });
  return response.data;
};
