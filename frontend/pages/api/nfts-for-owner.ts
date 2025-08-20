import { NextApiRequest, NextApiResponse } from 'next';

const fetchWithRetry = async (url: string, retries = 3): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress, pageKey, limit } = req.query;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!walletAddress) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  if (!ALCHEMY_API_KEY) {
    return res.status(500).json({ error: "Alchemy API key not configured" });
  }

  const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}`;

  try {
    const url = `${ALCHEMY_BASE_URL}/getNFTs?owner=${walletAddress}&withMetadata=true${
      pageKey ? `&pageKey=${pageKey}` : ""
    }&pageSize=${Number(limit) || 50}`;
    
    const response = await fetchWithRetry(url);
    
    // Transform the response to match your expected format
    const transformedNFTs = response.ownedNfts?.map((nft: any) => ({
      collectionName: nft.contract?.name || nft.title || "Unknown Collection",
      imageUrl: nft.media?.[0]?.gateway || nft.metadata?.image || null,
      name: nft.title || nft.metadata?.name || "Untitled",
      tokenId: nft.id?.tokenId || "Unknown",
      description: nft.description || nft.metadata?.description || "",
      contractAddress: nft.contract?.address,
      tokenType: nft.id?.tokenMetadata?.tokenType,
      balance: nft.balance || "1",
      attributes: nft.metadata?.attributes || [],
      externalUrl: nft.metadata?.external_url || null,
    })) || [];

    res.json({ 
      ownedNfts: transformedNFTs,
      pageKey: response.pageKey 
    });
  } catch (error: unknown) {
    console.error("Error fetching NFTs for owner:", error);
    res.status(500).json({ error: "Failed to fetch NFTs for owner" });
  }
}
