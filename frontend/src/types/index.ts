export interface MarketData {
  current_price: {
    usd: number;
  };
  market_cap: {
    usd: number;
  };
  price_change_percentage_24h?: number;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
}

export interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: MarketData;
}

export interface CoinHistory {
  prices: [number, number][];
}

export interface RawNFTResponse {
  nfts: RawNFT[];
  pageKey: string | null;
}

export interface RawNFT {
  tokenId: string;
  name: string;
  description: string;
  image: {
    cachedUrl: string;
    thumbnailUrl: string;
  };
  collection: {
    name: string;
    slug?: string;
  };
  contract: {
    openSeaMetadata: {
      description: string;
    };
    address: string;
  };
  raw?: {
    metadata?: {
      attributes?: Array<{
        trait_type: string;
        value: string | number;
      }>;
    };
  };
}

export interface NFT {
  imageUrl: string | null;
  name: string;
  collectionName: string;
  tokenId: string;
  description?: string;
  contractAddress?: string;
  tokenType?: string;
  balance?: string;
  attributes?: Array<{ trait_type: string; value: string }>;
  externalUrl?: string | null;
}

export interface NFTResponse {
  ownedNfts: NFT[];
}
