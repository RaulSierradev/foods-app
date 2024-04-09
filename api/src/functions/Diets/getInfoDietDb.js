const { Diet } = require("../../db");

async function getInfoDietDb() {
  const AllDiets = await Diet.findAll({
    attributes: ["name", "id"],
  });

  const dietsAllArray = [];
  AllDiets.forEach((element) =>
    dietsAllArray.push({ name: element.name, id: element.id })
  );

  return dietsAllArray;
}

module.exports = getInfoDietDb;
