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
export function postActivity(payload) {
	return async function (dispatch) {
		const response = await axios.post(
			"http://localhost:3000/activity",
			payload
		);
		return response;
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
			var json = await axios.get("http://localhost:3001/country/?name=" + name);
			return dispatch({
				type: "GET_COUNTRY_NAME",
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function orderBy(payload) {
	return {
		type: "ORDER_BY",
		payload,
	};
}
