import { Router } from "express";
import axios from "axios";
import { getFromCache, setToCache } from "../utils/cache";
import dotenv from "dotenv";
import * as dfd from "danfojs-node";

dotenv.config();

const router = Router();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const endpoint = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}`;

router.get("/nfts", (req, res) => {
  res.send("NFT API Endpoint");
});

const handleApiRes = (res: any) => {
  if (res.status === 200) {
    return res.data;
  } else if (res.status === 429) {
    return { error: "Too many requests, please try again later." };
  } else {
    return {
      error:
        "An error occurred, please confirm the address is correct or try again later.",
    };
  }
};

router.get("/profile/:address", async (req, res) => {
  const address = req.params.address;
  const cacheKey = `profile_${address}`;
  const cachedData = getFromCache(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const url = `${endpoint}/getNFTs?owner=${address}&withMetadata=true&excludeFilters[]=SPAM&excludeFilters[]=AIRDROPS&spamConfidenceLevel=VERY_HIGH&pageSize=100`;

  try {
    const response = await axios.get(url);
    const data = handleApiRes(response);
    setToCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NFTs" });
  }
});

router.get("/collections/:address", async (req, res) => {
  const address = req.params.address;
  const cacheKey = `collections_${address}`;
  const cachedData = getFromCache(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const url = `${endpoint}/getNFTsForCollection?contractAddress=${address}&withMetadata=true`;

  try {
    const response = await axios.get(url);
    const data = handleApiRes(response);
    setToCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NFTs" });
  }
});

router.get("/collections/:address/appraise", async (req, res) => {
  const address = req.params.address;
  const cacheKey = `appraise_${address}`;
  const cachedData = getFromCache(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const url = `${endpoint}/getNFTs?owner=${address}&pageSize=100&withMetadata=false&excludeFilters[]=SPAM&excludeFilters[]=AIRDROPS`;

  try {
    const response = await axios.get(url);
    let data = handleApiRes(response);

    if (data.error) {
      return res.status(500).json(data);
    }

    let holdings = new dfd.DataFrame(data.ownedNfts);
    if (data.pageKey) {
      let morePages = true;
      let pageKey = data.pageKey;

      while (morePages) {
        const paginatedUrl = `${endpoint}/getNFTs?owner=${address}&pageSize=100&withMetadata=false&excludeFilters[]=SPAM&excludeFilters[]=AIRDROPS&pageKey=${pageKey}`;
        const paginatedResponse = await axios.get(paginatedUrl);
        const paginatedData = paginatedResponse.data;
        const newPage = new dfd.DataFrame(paginatedData.ownedNfts);

        holdings = dfd.concat({
          dfList: [holdings, newPage],
          axis: 0,
        }) as dfd.DataFrame;
        holdings = holdings.resetIndex() as dfd.DataFrame;

        if (paginatedData.pageKey) {
          pageKey = paginatedData.pageKey;
        } else {
          morePages = false;
        }
      }
    }

    holdings = holdings.loc({
      columns: ["contract.address", "balance"],
    }) as dfd.DataFrame;

    holdings["balance"] = holdings["balance"].astype("int");
    holdings = holdings.groupby(["contract.address"]).sum() as dfd.DataFrame;

    let metadata;
    if (holdings.shape[0] < 100) {
      const contractList = holdings["contract.address"].values;
      const metadataResponse = await axios.post(
        `${endpoint}/getContractMetadataBatch`,
        {
          contractAddresses: contractList,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      metadata = new dfd.DataFrame(metadataResponse.data);
    } else {
      const numberOfPages = Math.ceil(holdings.shape[0] / 100);
      const holdingsList = splitDataFrame(holdings, numberOfPages);
      const metadataList: dfd.DataFrame[] = [];

      for (const holdingsPage of holdingsList) {
        const contractList = holdingsPage["contract.address"].values;
        const metadataResponse = await axios.post(
          `${endpoint}/getContractMetadataBatch`,
          {
            contractAddresses: contractList,
          },
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
          }
        );
        const temp = new dfd.DataFrame(metadataResponse.data);
        metadataList.push(temp);
      }
      metadata = dfd.concat({ dfList: metadataList, axis: 0 }) as dfd.DataFrame;
    }

    metadata = metadata.loc({
      columns: [
        "contractMetadata.name",
        "contractMetadata.openSea.imageUrl",
        "contractMetadata.openSea.floorPrice",
      ],
    }) as dfd.DataFrame;

    let portfolio = holdings.merge(metadata, {
      on: ["contract.address"],
      how: "inner",
    }) as dfd.DataFrame;

    portfolio = portfolio.loc({
      rows: portfolio["contractMetadata.openSea.floorPrice"].gt(
        0
      ) as dfd.Series,
    }) as dfd.DataFrame;

    portfolio = portfolio.loc({
      columns: [
        "contract.address",
        "balance",
        "contractMetadata.name",
        "contractMetadata.openSea.imageUrl",
        "contractMetadata.openSea.floorPrice",
      ],
    }) as dfd.DataFrame;

    portfolio.addColumn(
      "value",
      portfolio["balance"].mul(portfolio["contractMetadata.openSea.floorPrice"])
    );

    const totalValue = portfolio["value"].sum();
    portfolio = portfolio.toDict() as any;

    const result = {
      portfolio: portfolio,
      total_value: totalValue,
    };

    setToCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to appraise NFTs" });
  }
});

const splitDataFrame = (
  df: dfd.DataFrame,
  numberOfSplits: number
): dfd.DataFrame[] => {
  const result: dfd.DataFrame[] = [];
  const numRows = df.shape[0];
  const splitSize = Math.ceil(numRows / numberOfSplits);

  for (let i = 0; i < numRows; i += splitSize) {
    const end = Math.min(i + splitSize, numRows);
    result.push(df.iloc({ rows: [`${i}:${end}`] }) as dfd.DataFrame);
  }

  return result;
};

export default router;
