import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- Naya import

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // <-- Naya import

dotenv.config();
connectDB();

const app = express();
app.use(cors()); // <-- CORS ko yahan enable karein
app.use(express.json());

app.get('/', (req, res) => {
  res.send("'Mera Cart' API is running...");
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // <-- Naya route

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));