import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }

  try {
    // Fetch coin price history from CoinGecko (7 days by default)
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    );

    // Return the price history data
    res.status(200).json({
      prices: response.data.prices
    });
  } catch (error) {
    console.error('Error fetching coin history:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return res.status(404).json({ error: 'Coin not found' });
      }
      if (error.response?.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
    }
    
    res.status(500).json({ error: 'Failed to fetch coin history' });
  }
}
