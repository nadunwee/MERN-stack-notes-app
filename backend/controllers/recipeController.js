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
const getRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a recipe (mongoose ID is invalid)" });
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    return res
      .status(400)
      .json({ error: "NO such a recipe (get recipe by ID)" });
  }

  res.status(200).json(recipe);
};

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

// DELETE a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a recipe (mongoose ID is invalid)" });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });

  if (!recipe) {
    return res
      .status(400)
      .json({ error: "NO such a recipe (get recipe by ID)" });
  }

  res.status(200).json(recipe);
};

// UPDATE a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a recipe (mongoose ID is invalid)" });
  }

  const recipe = await Recipe.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!recipe) {
    return res
      .status(400)
      .json({ error: "NO such a recipe (get recipe by ID)" });
  }

  res.status(200).json(recipe);
};

module.exports = {
  getRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
  updateRecipe,
};
