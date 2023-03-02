import axios from "axios";

export function getCountries() {
	return async function (dispatch) {
		var json = await axios.get("http://localhost:3001/countries");
		return dispatch({
			type: "GET_COUNTRIES",
			payload: json.data,
		});
	};
}
export function getActivities() {
	return async function (dispatch) {
		var json = await axios.get("http://localhost:3001/activities");
		return dispatch({
			type: "GET_ACTIVITIES",
			payload: json.data,
		});
	};
}
export function postActivity(payload) {
	return async function (dispatch) {
		const response = await axios.post(
			"http://localhost:3001/activities",
			payload
		);
		console.log(response);
		return response;
	};
}
export function filterByContinent(payload) {
	return {
		type: "FILTER_BY_CONTINENT",
		payload,
	};
}
export function filterByActivity(payload) {
	return {
		type: "FILTER_BY_ACTIVITY",
		payload,
	};
}
export function getCountryName(payload) {
	return async function (dispatch) {
		try {
			var json = await axios.get(
				"http://localhost:3001/countries/?name=" + payload
			);
			console.log(payload);
			console.log(json);
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
export function getDetail(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get("http://localhost:3001/countries/" + id);
			return dispatch({
				type: "GET_DETAILS",
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
