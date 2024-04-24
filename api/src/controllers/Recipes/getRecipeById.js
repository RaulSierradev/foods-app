const getIdRecipe = require("../../functions/Recipes/getIdRecipe");

async function getRecipeById(req, res) {
  try {
    const { id } = req.params;
    const recipe = await getIdRecipe(id);
    return recipe
      ? res.status(200).json(recipe)
      : res.status(400).json({error: `Id not found`});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getRecipeById;
