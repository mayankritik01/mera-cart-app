import Product from '../models/productModel.js';

// @desc    Fetch all products OR filtered products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // URL se keyword nikalein (e.g., /api/products?keyword=phone)
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i', // 'i' ka matlab case-insensitive (chote-bade letters se fark nahi padega)
          },
        }
      : {}; // Agar keyword nahi hai, to empty object

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  // ... (purana code waisa hi rahega)
};

export { getProducts, getProductById };