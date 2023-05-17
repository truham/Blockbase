/* ----- CONSTANTS ----- */
const GET_NFTS_BY_ADDRESS = "nfts/GET_NFTS_BY_ADDRESS";
const GET_NFTS_BY_COLLECTION = "nfts/GET_NFTS_BY_COLLECTION";
const GET_NFT_PORTFOLIO_APPRAISE = "nfts/GET_NFT_PORTFOLIO_APPRAISE";
const NFTS_ERROR = "nfts/NFTS_ERROR";

/* ----- ACTIONS ----- */
const getNFTsByAddressAction = (nfts) => ({
  type: GET_NFTS_BY_ADDRESS,
  nfts,
});

const getNFTsByCollectionAction = (nfts) => ({
  type: GET_NFTS_BY_COLLECTION,
  nfts,
});

const getNFTsPortfolioAppraiseAction = (nfts) => ({
  type: GET_NFT_PORTFOLIO_APPRAISE,
  nfts,
});

const nftsErrorAction = (error) => ({
  type: NFTS_ERROR,
  error,
});

/* ----- THUNKS ----- */
export const getNFTsByAddressThunk = (address) => async (dispatch) => {
  const res = await fetch(`/api/nfts/profile/${address}`);
  if (res.ok) {
    const nfts = await res.json();
    dispatch(getNFTsByAddressAction(nfts));
    return nfts;
  } else {
    const error = await res.json();
    dispatch(nftsErrorAction(error));
  }
};

export const getNFTsByCollectionThunk = (address) => async (dispatch) => {
  const res = await fetch(`/api/nfts/collections/${address}`);
  if (res.ok) {
    const nfts = await res.json();
    dispatch(getNFTsByCollectionAction(nfts));
    return nfts;
  } else {
    const error = await res.json();
    dispatch(nftsErrorAction(error));
  }
};

export const getNFTsPortfolioAppraiseThunk = (address) => async (dispatch) => {
  const res = await fetch(`/api/nfts/collections/${address}/appraise`);
  if (res.ok) {
    const nfts = await res.json();
    dispatch(getNFTsPortfolioAppraiseAction(nfts));
    return nfts;
  } else {
    const error = await res.json();
    dispatch(nftsErrorAction(error));
  }
};

/* ----- INITIAL STATE ----- */
const initialState = {
  nfts: null,
  portfolio: null,
  error: null,
};

/* ----- REDUCER ----- */
const nftsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_NFTS_BY_ADDRESS:
      newState.nfts = action.nfts;
      newState.error = null;
      return newState;
    case GET_NFTS_BY_COLLECTION:
      newState.nfts = action.nfts;
      newState.error = null;
      return newState;
    case GET_NFT_PORTFOLIO_APPRAISE:
      newState.portfolio = action.nfts;
      newState.error = null;
      return newState;
    case NFTS_ERROR:
      newState.error = action.error;
      return newState;
    default:
      return state;
  }
};

export default nftsReducer;
