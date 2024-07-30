import axios from "axios";

export const getNFTs = async (
  address: string,
  pageKey?: string,
  limit: number = 20
) => {
  const response = await axios.get("/api/nfts-for-owner", {
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
  const response = await axios.get("/api/nfts-for-contract", {
    params: {
      contractAddress,
      startToken,
      limit,
    },
  });
  return response.data;
};
