const { Country, Activity } = require("../db");

async function newActTour(name, dificulty, duration, season, country) {
  if (name) {
    let findInDb = await Activity.findOne({ where: { name: name } });
    if (findInDb === null) {
      let activity = await Activity.create({
        name,
        dificulty,
        duration,
        season,
      });
      let countryInDb = await Country.findOne({ where: { name: country } });
      activity.addCountry(countryInDb);
      return "Activity created successfully";
    } else throw new Error("The activity already exist");
  } else throw new Error("Please insert a name");
}
module.exports = { newActTour };
