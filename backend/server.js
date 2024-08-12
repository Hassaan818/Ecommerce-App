import path from 'path';
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import productRoutes from './routes/ProductRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/config/paypal', (req,res) => res.send({
  clientId: process.env.PAYPAL_CLIENT_ID
}))

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))



app.use(notFound);
app.use(errorHandler)



try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log("connected...");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
