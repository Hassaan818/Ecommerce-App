import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import productRoutes from './routes/ProductRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/api/products', productRoutes)

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
