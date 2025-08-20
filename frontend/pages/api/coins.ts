import { NextApiRequest, NextApiResponse } from 'next';

// Simple cache implementation
const cache = new Map();
const CACHE_TTL = 60000; // 1 minute

const getFromCache = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

const setToCache = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

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
  const { page = 1, per_page = 100 } = req.query;
  const cacheKey = `coins_${page}_${per_page}`;
  
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

  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const data = await fetchWithRetry(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`
    );
    setToCache(cacheKey, data);
    res.json(data);
  } catch (error: unknown) {
    console.error("Error fetching coins:", error);
    res.status(500).json({ error: "Failed to fetch data from CoinGecko API" });
  }
}
