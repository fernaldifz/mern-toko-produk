import express from "express";
import ProductsCtrl from "./products.controller.js";

const router = express.Router();

router
  .route("/")
  .get(ProductsCtrl.apiGetProducts)
  .post(ProductsCtrl.apiPostProduct)
  .put(ProductsCtrl.apiUpdateProduct)
  .delete(ProductsCtrl.apiDeleteProduct);

router.route("/id/:id").get(ProductsCtrl.apiGetProductById);
router.route("/category").get(ProductsCtrl.apiGetProductCategories);

export default router;
