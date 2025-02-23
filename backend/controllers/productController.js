import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductsModel.js";

//@desc Get products
//@route PUT /api/products
//@access Public

export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({...keyword});


  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc Get single product
//@route Get /api/products/:id
//@access Public

export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc Create products
//@route POST /api/products
//@access private/admin

export const createProducts = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json(product);
});

//@desc Edit products
//@route PUT /api/products/:id
//@access private/admin

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//Delete a product

export const deleteProduct = asyncHandler(async (req, res) => {
  const removeProduct = await Product.findByIdAndDelete(req.params.id);
  if (!removeProduct) {
    res.status(404);
    throw new Error("product not found");
  } else {
    res.json({ msg: "product deleted" });
  }
});

//product reviews

export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(400);
    throw new Error("Resource not found");
  }
});

export const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating: -1}).limit(3);
  res.status(200).json(products);
});
