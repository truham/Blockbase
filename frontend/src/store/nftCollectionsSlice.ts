import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNFTsForContract } from "../services/nftService";
import { RawNFTResponse, RawNFT } from "../types";

interface FetchNFTsForContractArgs {
  contractAddress: string;
  startToken?: string;
  limit?: number;
}

interface NFTCollectionState {
  nfts: RawNFT[];
  loading: boolean;
  error: string | null;
  nextPageKey: string | null;
}

export const fetchNFTsForContract = createAsyncThunk(
  "nftCollections/fetchNFTsForContract",
  async ({ contractAddress, startToken, limit }: FetchNFTsForContractArgs) => {
    const response = await getNFTsForContract(
      contractAddress,
      startToken,
      limit
    );
    return response;
  }
);

const nftCollectionSlice = createSlice({
  name: "nftCollections",
  initialState: {
    nfts: [],
    loading: false,
    error: null,
    nextPageKey: null,
  } as NFTCollectionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNFTsForContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNFTsForContract.fulfilled, (state, action) => {
        const { nfts, pageKey } = action.payload as RawNFTResponse;
        state.nfts = [...state.nfts, ...nfts];
        state.loading = false;
        state.nextPageKey = pageKey;
      })
      .addCase(fetchNFTsForContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default nftCollectionSlice.reducer;
