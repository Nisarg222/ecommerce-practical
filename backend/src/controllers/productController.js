const { Product, ProductImage, Category } = require('../models');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: ProductImage }, { model: Category }],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: ProductImage }, { model: Category }],
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  
  try {
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
      // userId: req.user.id // If we want to track who created it
    });

    if (req.files) {
         const images = req.files.map(file => ({
             productId: product.id,
             image_url: `/uploads/${file.filename}`
         }));
         await ProductImage.bulkCreate(images);
    }

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock || product.stock;
      product.categoryId = categoryId || product.categoryId;

      await product.save();

      if (req.files && req.files.length > 0) {
         const images = req.files.map(file => ({
             productId: product.id,
             image_url: `/uploads/${file.filename}`
         }));
         await ProductImage.bulkCreate(images);
      }

      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
};


module.exports = { getProducts, getProductById, createProduct, updateProduct };
