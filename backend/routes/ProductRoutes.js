import express from "express";
import {
  createProductReview,
  createProducts,
  deleteProduct,
  getProducts,
  getSingleProduct,
  getTopRatedProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

// router.get("/:id",;
router.route("/").get(getProducts).post(protect, admin, createProducts);
router.get('/top', getTopRatedProducts);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview)
export default router;
