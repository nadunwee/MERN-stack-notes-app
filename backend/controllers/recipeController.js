const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

// get all the recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single recipe

// create a new recipe
const createRecipe = async (req, res) => {
  const { title, ingredients, description } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push(title);
  }
  if (!ingredients) {
    emptyFields.push(ingredients);
  }
  if (!description) {
    emptyFields.push(description);
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "pleas fill the all the fields", emptyFields });
  }

  try {
    const recipe = await Recipe.create({ title, ingredients, description });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipes,
  createRecipe,
};
