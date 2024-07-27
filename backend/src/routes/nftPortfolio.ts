import { Router } from "express";
import dotenv from "dotenv";
import fetchWithRetry from "../utils/fetchWithRetry";
import { NFT } from "../types/nft";

dotenv.config();

const router = Router();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}`;

const SPAM_CLASSIFICATIONS = [
  "OwnedByMostHoneyPots",
  "Erc721TooManyOwners",
  "Erc721TooManyTokens",
  "NoSalesActivity",
  "HighAirdropPercent",
  "HighHoneyPotPercent",
  "HoneyPotsOwnMultipleTokens",
];

const fetchAllNFTs = async (walletAddress: string): Promise<NFT[]> => {
  let allNFTs: NFT[] = [];
  let pageKey: string | null = null;

  do {
    const url = `${ALCHEMY_BASE_URL}/getNFTsForOwner?owner=${walletAddress}&withMetadata=true${
      pageKey ? `&pageKey=${pageKey}` : ""
    }`;
    const response = await fetchWithRetry(url);
    const { ownedNfts, pageKey: newPageKey } = response;
    pageKey = newPageKey;
    allNFTs = [...allNFTs, ...ownedNfts];
  } while (pageKey);

  return allNFTs;
};

router.get("/nfts-for-owner", async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    const nftsResponse = await fetchAllNFTs(walletAddress as string);

    // Filter out spam NFTs based on spam classifications
    const filteredNfts = nftsResponse.filter((nft) => {
      return (
        !nft.contract.isSpam &&
        !SPAM_CLASSIFICATIONS.some((classification) =>
          nft.contract.spamClassifications?.includes(classification)
        )
      );
    });

    res.json({ ownedNfts: filteredNfts });
  } catch (error: unknown) {
    console.error("Error fetching NFTs for owner:", error);
    res.status(500).json({ error: "Failed to fetch NFTs for owner" });
  }
});

export default router;
