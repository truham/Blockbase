import { Router } from "express";
import dotenv from "dotenv";
import fetchWithRetry from "../utils/fetchWithRetry";

dotenv.config();

const router = Router();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}`;

router.get("/nfts-for-owner", async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    const nftsResponse = await fetchWithRetry(
      `${ALCHEMY_BASE_URL}/getNFTsForOwner?owner=${walletAddress}&withMetadata=true`
    );
    res.json(nftsResponse);
  } catch (error: unknown) {
    console.error("Error fetching NFTs for owner:", error);
    res.status(500).json({ error: "Failed to fetch NFTs for owner" });
  }
});

export default router;
