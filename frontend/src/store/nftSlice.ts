import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNFTs } from "../services/nftService";
import { NFT } from "../types";

export const fetchNFTs = createAsyncThunk(
  "nfts/fetchNFTs",
  async (address: string) => {
    const response = await getNFTs(address);
    return response;
  }
);

const nftSlice = createSlice({
  name: "nfts",
  initialState: {
    nfts: [] as NFT[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNFTs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNFTs.fulfilled, (state, action) => {
        state.nfts = action.payload;
        state.loading = false;
      })
      .addCase(fetchNFTs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default nftSlice.reducer;
