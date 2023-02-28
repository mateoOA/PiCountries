const axios = require("axios");
const sequelize = require("sequelize");
const { Country, Activity } = require("../db");
const { Op } = sequelize;

async function getAllCountries() {
  const countryInDB = await Country.findAll();

  if (countryInDB.length > 0) {
    return countryInDB;
  }

  const countryCall = await axios.get("https://restcountries.com/v3/all");
  console.log(countryCall);
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

  return await Country.bulkCreate(countryValues);
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

async function getCountryByName(name) {
  const countries = await Country.findAll(
    { where: { name: { [Op.iLike]: `%${name}%` } } },
    { include: { model: Activity } }
  );

  if (!countries.length) {
    throw new Error("No se encontraron paises");
  }

  return countries;
}

module.exports = { getAllCountries, getCountryById, getCountryByName };
