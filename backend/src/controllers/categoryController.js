const { Category } = require('../models');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  const { name, slug, image } = req.body;
  try {
    const category = await Category.create({ name, slug, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Invalid category data' });
  }
};

module.exports = { getCategories, createCategory };
