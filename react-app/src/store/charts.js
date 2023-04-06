/* ----- CONSTANTS ----- */
const GET_24H_CHART = "cryptocurrencies/GET_24H_CHART";
const CHARTS_ERROR = "cryptocurrencies/CHARTS_ERROR";

/* ----- ACTIONS ----- */
const get24HChartAction = (chart) => ({
  type: GET_24H_CHART,
  chart,
});

const chartsErrorAction = (error) => ({
  type: CHARTS_ERROR,
  error,
});

/* ----- THUNKS ----- */
export const get24HChartThunk = (coinId) => async (dispatch) => {
  const res = await fetch(`/api/cryptocurrencies/${coinId}/24h_chart`);
  if (res.ok) {
    const chart = await res.json();
    dispatch(get24HChartAction(chart));
    return chart;
  } else {
    const error = await res.json();
    dispatch(chartsErrorAction(error));
  }
};

/* ----- INITIAL STATE ----- */
const initialState = {
  chart: null,
  error: null,
};

/* ----- REDUCER ----- */
const chartsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_24H_CHART:
      newState.chart = action.chart;
      return newState;
    case CHARTS_ERROR:
      newState.error = action.error;
      return newState;
    default:
      return state;
  }
};

export default chartsReducer;
