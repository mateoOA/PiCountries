const axios = require("axios");
const { Country, Activity } = require("../db");

async function getAllCountries() {
  const countryCall = await axios.get("https://restcountries.com/v3/all");
  let countryInDB = await Country.findAll();
  if (countryInDB.length === 0) {
    let countryValue = countryCall.data.map((m) => {
      return {
        id: m.cca3,
        name: m.name.common,
        flag: m.flags[1],
        continent: m.region,
        capital: m.capital,
        subRegion: m.subregion,
        area: m.area,
        population: m.population,
      };
    });
    countryInDB = await Country.bulkCreate(countryValue);
  }
  return countryInDB;
}
async function getCountryById(id) {
  if (id.length === 3) {
    const idCall = await Country.findByPk(id.toUpperCase(), {
      include: Activity,
    });
    return idCall;
  }
  throw new Error("id inexistente");
}
async function getCountryByName(name) {
  const nameCall = await Country.findOne(
    { where: { name: name } },
    { include: { model: Activity } }
  );
  return nameCall;
}

module.exports = { getAllCountries, getCountryById, getCountryByName };
