import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/country", {});
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}
export function filterByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}
export function getCountryName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/country/?name=" + name);
      return dispatch({
        type: "GET_COUNTRY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
