const { Router, json } = require("express");
const {
  getAllCountries,
  getCountryById,
  getCountryByName,
} = require("../controller/index");
const router = Router();
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
    res.status(400).json(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let getCountry = await getCountryById(id);
    res.json(getCountry);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});
module.exports = router;
