/* ----- CONSTANTS ----- */
const GET_24H_CHART = "cryptocurrencies/GET_24H_CHART";
const CHARTS_ERROR = "cryptocurrencies/CHARTS_ERROR";

/* ----- ACTIONS ----- */
const get24HChartAction = (coinId, chart) => ({
  type: GET_24H_CHART,
  coinId,
  chart,
});

const chartsErrorAction = (error) => ({
  type: CHARTS_ERROR,
  error,
});

/* ----- THUNKS ----- */
export const get24HChartThunk = (coinId) => async (dispatch, getState) => {
  // store fetched data - check if chart data already exists via coinId, if so, prevent from making another API call
  // goal is to reduce chances of hitting rate limit
  const existingChartData = getState().charts.charts?.[coinId];
  if (existingChartData) {
    return;
  }

  const res = await fetch(`/api/cryptocurrencies/${coinId}/24h_chart`);
  if (res.ok) {
    const chart = await res.json();
    dispatch(get24HChartAction(coinId, chart));
    return chart;
  } else {
    const error = await res.json();
    dispatch(chartsErrorAction(error));
  }
};

/* ----- INITIAL STATE ----- */
const initialState = {
  charts: {},
  error: null,
};

/* ----- REDUCER ----- */
const chartsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_24H_CHART:
      newState.charts = {
        ...state.charts,
        [action.coinId]: action.chart,
      };
      return newState;
    case CHARTS_ERROR:
      newState.error = action.error;
      return newState;
    default:
      return state;
  }
};

export default chartsReducer;
