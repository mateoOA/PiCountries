const axios = require("axios");
const sequelize = require("sequelize");
const { Country, Activity } = require("../db");
const { Op } = sequelize;

async function populateCountries() {
	try {
		const countryCall = await axios.get("https://restcountries.com/v3/all");
		const countryValues = countryCall.data.map((m) => {
			return {
				id: m.cca3,
				name: m.name.common,
				flag: m.flags[1],
				continent: m.region,
				capital: m.capital && m.capital[0],
				subRegion: m.subregion,
				area: m.area,
				population: m.population,
			};
		});

		await Country.bulkCreate(countryValues);
	} catch (error) {
		console.log(error);
	}
}

async function getCountries(params) {
	let countriesWhereClause = null;
	let activityWhereClause = null;

	const sortBy = params.sortBy || "name";
	const sortDir = params.sortDir || "ASC";

	const page = params.page || 0;
	const limit = params.limit || 9999;

	if (params.name) {
		countriesWhereClause = { name: { [Op.iLike]: `%${params.name}%` } };
	}

	if (params.continent) {
		const whereClause = { continent: { [Op.iLike]: `%${params.continent}%` } };

		countriesWhereClause = countriesWhereClause
			? { [Op.and]: [countriesWhereClause, whereClause] }
			: whereClause;
	}

	if (params.activity) {
		activityWhereClause = { name: params.activity };
	}

	let countriesInDB = await Country.findAll();

	if (!countriesInDB.length) {
		await populateCountries();
	}

	countriesInDB = await Country.findAll({
		where: countriesWhereClause || undefined,
		order: [[sortBy, sortDir]],
		include: {
			model: Activity,
			required: false,
			where: activityWhereClause || undefined,
		},
		limit: limit,
		offset: page * limit,
	});

	if (!countriesInDB.length) {
		throw new Error("No se encontraron paises");
	}

	return countriesInDB;
}

async function getCountryById(id) {
	if (id.length !== 3) {
		throw new Error("Id invalido");
	}

	const country = await Country.findByPk(id.toUpperCase(), {
		include: Activity,
	});

	if (!country) {
		throw new Error("No se encontro un pais con ese ID");
	}

	return country;
}

module.exports = { getCountries, getCountryById };
