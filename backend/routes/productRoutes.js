import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'; // Naya function import karein

router.route('/').get(getProducts);
router.route('/:id').get(getProductById); // Naya route yahan add karein

export default router;