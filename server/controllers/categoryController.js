const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// Create Prouct
const createCategory = asyncHandler(async (req, res) => {
    console.log(req.body);
  const { name } = req.body;

  //   Validation
  if (!name) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }


  // Create Category
  const category = await Category.create({
    user: req.user.id,
    name,
  });

  res.status(201).json(category);
});

// Get all Categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(categories);
});

// Get single Category
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  // if category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  // Match category to its user
  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(category);
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  // if product doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  // Match category to its user
  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await category.remove();
  res.status(200).json({ message: "Category deleted." });
});

// Update Category
const updateCategory= asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
    console.log(req.body);
  const category = await Category.findById(id);

  // if category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  // Match category to its user
  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }


  // Update Category
  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: id },
    {
      name
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedCategory);
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
