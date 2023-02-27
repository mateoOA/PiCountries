const { Router, json, query } = require("express");
const { Activity } = require("../db");
const router = Router();
const { createAct } = require("../controller/activities");
router.use(json());

router.get("/", async (req, res) => {
  const activities = await Activity.findAll();
  if (activities) {
    return res.status(200).json(activities);
  } else {
    return res
      .status(404)
      .json(activities.length ? activities : "No se encontraron activdades");
  }
});
router.post("/", async (req, res, next) => {
  let { name, dificulty, duration, season, country } = req.body;
  try {
    let activity = await createAct(name, dificulty, duration, season, country);
    res.json(activity);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
