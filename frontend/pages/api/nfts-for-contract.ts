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
  const { contractAddress, startToken, limit } = req.query;
  
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

  if (!contractAddress) {
    return res.status(400).json({ error: "Contract address is required" });
  }

  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  if (!ALCHEMY_API_KEY) {
    return res.status(500).json({ error: "Alchemy API key not configured" });
  }

  const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}`;

  try {
    const url = `${ALCHEMY_BASE_URL}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true${
      startToken ? `&startToken=${startToken}` : ""
    }&limit=${Number(limit) || 50}`;
    
    const nftsResponse = await fetchWithRetry(url);
    res.json({ nfts: nftsResponse.nfts, pageKey: nftsResponse.pageKey });
  } catch (error: unknown) {
    console.error("Error fetching NFTs for contract:", error);
    res.status(500).json({ error: "Failed to fetch NFTs for contract" });
  }
}
