// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getNFTs } from "../services/nftService";
// import { NFT, RawNFTResponse } from "../types";

// export const fetchNFTs = createAsyncThunk(
//   "nfts/fetchNFTs",
//   async (address: string) => {
//     const response: RawNFTResponse = await getNFTs(address);

//     // Parse the response to match the NFT type
//     const parsedNFTs: NFT[] = response.ownedNfts.map((nft) => ({
//       tokenId: nft.tokenId,
//       title: nft.name || "Untitled",
//       description: nft.description || "No description",
//       image: nft.image?.cachedUrl || "default-image-url",
//       collection: nft.collection?.name || "Unknown Collection",
//     }));

//     return parsedNFTs;
//   }
// );

// const nftSlice = createSlice({
//   name: "nfts",
//   initialState: {
//     nfts: [] as NFT[],
//     loading: false,
//     error: null as string | null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNFTs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchNFTs.fulfilled, (state, action) => {
//         state.nfts = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchNFTs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || null;
//       });
//   },
// });

// export default nftSlice.reducer;
