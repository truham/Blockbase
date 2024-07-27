export interface NFT {
  contract: {
    address: string;
    name: string;
    symbol: string;
    totalSupply: number | null;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata: {
      floorPrice: number;
      collectionName: string;
      collectionSlug: string;
      safelistRequestStatus: string;
      imageUrl: string;
      description: string;
      externalUrl: string | null;
      twitterUsername: string | null;
      discordUrl: string | null;
      bannerImageUrl: string;
      lastIngestedAt: string;
    };
    isSpam: boolean;
    spamClassifications: string[];
  };
  tokenId: string;
  tokenType: string;
  name: string | null;
  description: string | null;
  tokenUri: string | null;
  image: {
    cachedUrl: string | null;
    thumbnailUrl: string | null;
    pngUrl: string | null;
    contentType: string | null;
    size: number | null;
    originalUrl: string | null;
  };
  raw: {
    tokenUri: string;
    metadata: Record<string, unknown>;
    error: string | null;
  };
  collection: {
    name: string;
    slug: string;
    externalUrl: string | null;
    bannerImageUrl: string | null;
  };
  mint: {
    mintAddress: string | null;
    blockNumber: number | null;
    timestamp: string | null;
    transactionHash: string | null;
  };
  owners: string[] | null;
  timeLastUpdated: string;
  balance: string;
  acquiredAt: {
    blockTimestamp: string | null;
    blockNumber: number | null;
  };
}
