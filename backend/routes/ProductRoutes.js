import express from 'express';
import { getProducts, getSingleProduct } from '../controllers/productCOntroller.js';

const router = express.Router();

router.get("/", getProducts);
  
  // router.get("/:id",;
  router.route("/").get(getProducts);
  router.route('/:id').get( getSingleProduct)

export default router