const { Country, Activity } = require("../db");

async function createAct(name, dificulty, duration, season, countries) {
  if (name) {
    let findInDb = await Activity.findOne({ where: { name: name } });
    if (findInDb === null) {
      let activity = await Activity.create({
        name,
        dificulty,
        duration,
        season,
      });
      countries.forEach(async (id) => {
        const country = await Country.findOne({
          where: { id },
        });
        console.log(country);
        await country?.addActivity(activity);
      });
      return "Activity created successfully";
    } else throw new Error("The activity already exist");
  } else throw new Error("Please insert a name");
}
module.exports = { createAct };
