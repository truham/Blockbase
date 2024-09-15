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

const MAX_NFTS = 1000;
const MAX_RETRIES = 3;

const fetchAllNFTs = async (walletAddress: string): Promise<NFT[]> => {
  let allNFTs: NFT[] = [];
  let pageKey: string | null = null;

  while (pageKey !== undefined && allNFTs.length < MAX_NFTS) {
    const url = `${ALCHEMY_BASE_URL}/getNFTsForOwner?owner=${walletAddress}&withMetadata=true${
      pageKey ? `&pageKey=${pageKey}` : ""
    }`;
    console.log(`Fetching NFTs from: ${url}`);
    try {
      const response = await fetchWithRetry(url, 5, 1000, 30000); // 5 retries, 1s initial delay, 30s max delay
      console.log(`Received response for page ${pageKey || "initial"}`);
      const { ownedNfts, pageKey: newPageKey } = response;
      pageKey = newPageKey;
      allNFTs = [...allNFTs, ...ownedNfts];
      console.log(`Total NFTs fetched so far: ${allNFTs.length}`);
    } catch (error) {
      console.error(
        `Error fetching NFTs for page ${pageKey || "initial"}:`,
        error
      );
      break; // Exit the loop if we've exhausted all retries
    }
  }

  return allNFTs;
};

router.get("/nfts-for-owner", async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress || typeof walletAddress !== "string") {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  console.log(`Received request for wallet: ${walletAddress}`);

  try {
    console.log(`Fetching NFTs for wallet: ${walletAddress}`);
    const nftsResponse = await fetchAllNFTs(walletAddress);
    console.log(`Successfully fetched ${nftsResponse.length} NFTs`);

    // Filter out spam NFTs based on spam classifications
    const filteredNfts = nftsResponse.filter((nft) => {
      return (
        !nft.contract.isSpam &&
        !SPAM_CLASSIFICATIONS.some((classification) =>
          nft.contract.spamClassifications?.includes(classification)
        )
      );
    });

    console.log(`Filtered NFTs: ${filteredNfts.length}`);
    res.json({ ownedNfts: filteredNfts });
  } catch (error: unknown) {
    console.error("Error fetching NFTs for owner:", error);
    res.status(500).json({ error: "Failed to fetch NFTs for owner" });
  }
});

export default router;
