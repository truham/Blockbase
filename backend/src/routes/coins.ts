import { Router } from "express";
import fetchWithRetry from "../utils/fetchWithRetry";
import { getFromCache, setToCache } from "../utils/cache";

const router = Router();

router.get("/coins", async (req, res) => {
  const cacheKey = "coins";
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const data = await fetchWithRetry(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    setToCache(cacheKey, data);
    res.json(data);
  } catch (error: unknown) {
    console.error("Error fetching coins:", error);
    res.status(500).json({ error: "Failed to fetch data from CoinGecko API" });
  }
});

router.get("/coins/:id", async (req, res) => {
  const { id } = req.params;
  const cacheKey = `coin_${id}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const data = await fetchWithRetry(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setToCache(cacheKey, data);
    res.json(data);
  } catch (error: unknown) {
    console.error(`Error fetching coin ${id}:`, error);
    res
      .status(500)
      .json({ error: "Failed to fetch coin data from CoinGecko API" });
  }
});

router.get("/coins/:id/history", async (req, res) => {
  const { id } = req.params;
  const cacheKey = `coin_${id}_history`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const data = await fetchWithRetry(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
    );
    setToCache(cacheKey, data);
    res.json(data);
  } catch (error: unknown) {
    console.error(`Error fetching coin history for ${id}:`, error);
    res
      .status(500)
      .json({ error: "Failed to fetch historical data from CoinGecko API" });
  }
});

export default router;
