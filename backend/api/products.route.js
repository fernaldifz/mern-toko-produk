import express from "express";
import ProductsCtrl from "./products.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

var storage = multer.diskStorage({
  destination: "api/images/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

router
  .route("/")
  .get(ProductsCtrl.apiGetProducts)
  .post(upload.single("image"), ProductsCtrl.apiPostProduct)
  .put(upload.single("image"), ProductsCtrl.apiUpdateProduct)
  .delete(ProductsCtrl.apiDeleteProduct);

router.route("/id/:id").get(ProductsCtrl.apiGetProductById);
router.route("/category").get(ProductsCtrl.apiGetProductCategories);

export default router;
