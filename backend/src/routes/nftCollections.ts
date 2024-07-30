import { Router } from "express";
import dotenv from "dotenv";
import fetchWithRetry from "../utils/fetchWithRetry";

dotenv.config();

const router = Router();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}`;

const fetchNFTsForContract = async (
  contractAddress: string,
  startToken: string | null,
  limit: number
): Promise<any> => {
  const url = `${ALCHEMY_BASE_URL}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true${
    startToken ? `&startToken=${startToken}` : ""
  }&limit=${limit}`;
  const response = await fetchWithRetry(url);
  return response;
};

router.get("/nfts-for-contract", async (req, res) => {
  const { contractAddress, startToken, limit } = req.query;

  if (!contractAddress) {
    return res.status(400).json({ error: "Contract address is required" });
  }

  try {
    const nftsResponse = await fetchNFTsForContract(
      contractAddress as string,
      startToken as string | null,
      Number(limit) || 50
    );

    res.json({ nfts: nftsResponse.nfts, pageKey: nftsResponse.pageKey });
  } catch (error: unknown) {
    console.error("Error fetching NFTs for contract:", error);
    res.status(500).json({ error: "Failed to fetch NFTs for contract" });
  }
});

export default router;
