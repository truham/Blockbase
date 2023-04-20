/* ----- CONSTANTS ----- */
const GET_NFTS_BY_ADDRESS = "nfts/GET_NFTS_BY_ADDRESS";
const NFTS_ERROR = "nfts/NFTS_ERROR";

/* ----- ACTIONS ----- */
const getNFTsByAddressAction = (nfts) => ({
  type: GET_NFTS_BY_ADDRESS,
  nfts,
});

const nftsErrorAction = (error) => ({
  type: NFTS_ERROR,
  error,
});

/* ----- THUNKS ----- */
export const getNFTsByAddressThunk = (address) => async (dispatch) => {
  const res = await fetch(`/api/nfts/${address}`);
  if (res.ok) {
    const nfts = await res.json();
    dispatch(getNFTsByAddressAction(nfts));
    return nfts;
  } else {
    const error = await res.json();
    dispatch(nftsErrorAction(error));
  }
};

/* ----- INITIAL STATE ----- */
const initialState = {
  nfts: null,
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
    case NFTS_ERROR:
      newState.error = action.error;
      return newState;
    default:
      return state;
  }
};

export default nftsReducer;
