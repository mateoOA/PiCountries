const initialState = {
	detail: [],
	countries: [],
	countriesCopy: [],
	activities: [],
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
				countries: action.payload,
			};
		case "GET_ACTIVITIES":
			return {
				...state,
				activities: action.payload,
			};
		case "POST_ACTIVITY":
			return {
				...state,
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
		case "GET_DETAILS":
			return {
				...state,
				detail: action.payload,
			};
		case "ORDER_BY":
			let sortedBy =
				action.payload === "A-Z"
					? state.countries.sort(function (a, b) {
							if (a.name > b.name) {
								return 1;
							}
							if (b.name > a.name) {
								return -1;
							}
							return 0;
					  })
					: action.payload === "Z-A"
					? state.countries.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (b.name > a.name) {
								return 1;
							}
							return 0;
					  })
					: action.payload === "Ascendant"
					? state.countries.sort(function (a, b) {
							if (a.population > b.population) {
								return 1;
							}
							if (b.population > a.population) {
								return -1;
							}
							return 0;
					  })
					: state.countries.sort(function (a, b) {
							if (a.population > b.population) {
								return -1;
							}
							if (b.population > a.population) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				countries: sortedBy,
			};

		default:
			return state;
	}
}
export default rootReducer;
