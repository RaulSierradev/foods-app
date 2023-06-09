require("dotenv").config();
let { Recipe, Diet } = require("../../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getIdRecipe(id) {
  if (id.includes("-")) {
    try {
      const recipeBD = await Recipe.findOne({
        where: { id: id },
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return recipeBD;
    } catch (error) {}
  } else {
    const response = await axios(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const recipeApi = {
      id: response.data.id,
      name: response.data.title,
      food_summary: response.data.summary,
      health_score: response.data.healthScore,
      image: response.data.image,
      ingredients: response.data.extendedIngredients.map((e) => {
        return {
          name: e.originalName,
          amount: e.measures.metric.amount,
          unitShort: e.measures.metric.unitShort,
        };
      }),
      instructions: response.data.analyzedInstructions[0]?.steps.map((step) => {
        return {
          number: step.number,
          step: step.step,
        };
      }),
      diets: response.data.diets.map((d) => {
        return { name: d };
      }),
    };

    return recipeApi;
  }
}

module.exports = getIdRecipe;
