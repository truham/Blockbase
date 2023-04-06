/* ----- CONSTANTS ----- */
const GET_FEATURED = "cryptocurrencies/GET_FEATURED";
const GET_EXPLORE = "cryptocurrencies/GET_EXPLORE";
const GET_COIN_DETAILS = "cryptocurrencies/GET_COIN_DETAILS";
const COINS_ERROR = "cryptocurrencies/COINS_ERROR";

/* ----- ACTIONS ----- */
const getFeaturedAction = (featured) => ({
  type: GET_FEATURED,
  featured,
});

const getExploreAction = (coins) => ({
  type: GET_EXPLORE,
  coins,
});

const getCoinDetailsAction = (coin) => ({
  type: GET_COIN_DETAILS,
  coin,
});

const coinsErrorAction = (error) => ({
  type: COINS_ERROR,
  error,
});

/* ----- THUNKS ----- */
export const getFeaturedThunk = () => async (dispatch) => {
  const res = await fetch("/api/cryptocurrencies/featured");
  if (res.ok) {
    const featured = await res.json();
    dispatch(getFeaturedAction(featured));
    return featured;
  } else {
    const error = await res.json();
    dispatch(coinsErrorAction(error));
  }
};

export const getExploreThunk = () => async (dispatch) => {
  const res = await fetch("/api/cryptocurrencies/explore");
  if (res.ok) {
    const coins = await res.json();
    dispatch(getExploreAction(coins));
    return coins;
  } else {
    const error = await res.json();
    dispatch(coinsErrorAction(error));
  }
};

export const getCoinDetailsThunk = (coinId) => async (dispatch) => {
  const res = await fetch(`/api/cryptocurrencies/${coinId}`);
  if (res.ok) {
    const coin = await res.json();
    dispatch(getCoinDetailsAction(coin));
    return coin;
  } else {
    const error = await res.json();
    dispatch(coinsErrorAction(error));
  }
};

/* ----- INITIAL STATE ----- */
const initialState = {
  coins: null,
  coin: null,
  featured: null,
  error: null,
};

/* ----- REDUCER ----- */
const coinsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_FEATURED:
      newState.featured = action.featured;
      return newState;
    case GET_EXPLORE:
      newState.coins = action.coins;
      return newState;
    case GET_COIN_DETAILS:
      newState.coin = action.coin;
      return newState;
    case COINS_ERROR:
      newState.error = action.error;
      return newState;
    default:
      return state;
  }
};

export default coinsReducer;
