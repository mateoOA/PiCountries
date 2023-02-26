const { Router, json, query } = require("express");
const {
  getAllCountries,
  getCountryById,
  getCountryByName,
} = require("../controller/index");
const { Country, Tourists } = require("../db");
const router = Router();
const { newActTour } = require("../controller/activities");
router.use(json());

router.get("/", async (req, res) => {
  try {
    let { name } = req.query;
    if (!name) {
      let countries = await getAllCountries();
      res.json(countries);
    } else {
      let getName = await getCountryByName(name);
      res.json(getName);
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let getCountry = await getCountryById(id);
    res.json(getCountry);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res, next) => {
  let { name, dificulty, duration, season, country } = req.body;
  try {
    let activity = await newActTour(name, dificulty, duration, season, country);
    res.json(activity);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
