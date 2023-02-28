const initialState = {
  countries: [],
  countriesCopy: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        countriesCopy: action.payload,
      };
    case "GET_COUNTRY_NAME":
      return {
        ...state,
        countries: action.paylod,
      };
    case "FILTER_BY_CONTINENT":
      const allCountriesCopy = state.countriesCopy;
      if (action.payload === "All") {
        return {
          ...state,
          countries: allCountriesCopy,
        };
      } else {
        return {
          ...state,
          countries: allCountriesCopy.filter(
            (el) => el.continent === action.payload
          ),
        };
      }

    default:
      return state;
  }
}
export default rootReducer;
