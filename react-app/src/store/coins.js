/* ----- CONSTANTS ----- */
const GET_FEATURED = "cryptocurrencies/GET_FEATURED";

/* ----- ACTIONS ----- */
const getFeaturedAction = (featured) => ({
  type: GET_FEATURED,
  featured,
});

/* ----- THUNKS ----- */
export const getFeaturedThunk = () => async (dispatch) => {
  const res = await fetch("/api/cryptocurrencies/featured");
  if (res.ok) {
    const featured = await res.json();
    dispatch(getFeaturedAction(featured));
    return featured;
  }
};

/* ----- INITIAL STATE ----- */
const initialState = {
  coins: null,
  featured: null,
};

/* ----- REDUCER ----- */
const coinsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_FEATURED:
      newState.featured = action.featured;
      return newState;
    default:
      return state;
  }
};

export default coinsReducer;
