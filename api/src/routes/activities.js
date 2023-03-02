const { Router, json } = require("express");
const { Activity } = require("../db");
const { createAct } = require("../controller/activities");
const router = Router();

router.use(json());

router.get("/", async (_req, res) => {
  const activities = await Activity.findAll();

  if (activities) {
    res.status(200).json(activities);
  } else {
    res
      .status(404)
      .json(activities.length ? activities : "No se encontraron activdades");
  }
});

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;

  try {
    const activity = await createAct(name, difficulty, duration, season, country);

    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
