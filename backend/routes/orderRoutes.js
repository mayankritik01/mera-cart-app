import express from 'express';
const router = express.Router();
import { addOrderItems, getMyOrders } from '../controllers/orderController.js'; // Naya function import karein
import { protect } from '../middleware/authMiddleware.js';

// protect middleware in routes ko private bana dega
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders); // Naya route yahan add karein

export default router;