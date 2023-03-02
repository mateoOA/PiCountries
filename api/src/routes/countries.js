const { Router, json } = require("express");
const { getCountries, getCountryById } = require("../controller/countries");
const router = Router();

router.use(json());

router.get("/", async (req, res) => {
  try {
    const params = {
      name: req.query.name?.toLowerCase(),
      continent: req.query.continent?.toLowerCase(),
      activity: req.query.activity,
      sortBy: req.query.sortBy,
      sortDir: req.query.sortDir,
      page: req.query.page,
      limit: req.query.limit,
    };

    for (const key in params) {
      if (params[key] === undefined || params[key] === null) {
        delete params[key];
      }
    }

    let countries = await getCountries(params);

    res.status(200).json(countries);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let getCountry = await getCountryById(id);

    res.status(200).json(getCountry);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
