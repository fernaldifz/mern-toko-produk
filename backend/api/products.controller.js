import ProductsDAO from "../dao/productsDAO.js";

export default class ProductsController {
  static async apiGetProducts(req, res, next) {
    const productsPerPage = req.query.productsPerPage
      ? parseInt(req.query.productsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { productsList, totalNumProducts } = await ProductsDAO.getProducts({
      filters,
      page,
      productsPerPage,
    });

    let response = {
      products: productsList,
      page: page,
      filters: filters,
      entries_per_page: productsPerPage,
      total_results: totalNumProducts,
    };
    res.json(response);
  }

  static async apiGetProductById(req, res, next) {
    try {
      let id = req.params.id || {};
      let product = await ProductsDAO.getProductByID(id);
      if (!product) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(product);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetProductCategories(req, res, next) {
    try {
      let categories = await ProductsDAO.getCategories();
      res.json(categories);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostProduct(req, res, next) {
    try {
      const productName = req.body.name;
      const productCategory = req.body.category;
      const productPrice = req.body.price;
      const productRating = req.body.rating;
      const productLikes = req.body.likes;
      const productDescription = req.body.description;
      const productImage = req.file.filename;
      const productDate = new Date();

      const ProductResponse = await ProductsDAO.addProduct(
        productName,
        productCategory,
        productPrice,
        productRating,
        productLikes,
        productDescription,
        productImage,
        productDate
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateProduct(req, res, next) {
    try {
      const productId = req.body._id;
      const productName = req.body.name;
      const productCategory = req.body.category;
      const productPrice = req.body.price;
      const productRating = req.body.rating;
      const productLikes = req.body.likes;
      const productDescription = req.body.description;
      const productImage = req.file.filename;
      const productDate = req.body.date;

      const productResponse = await ProductsDAO.updateProduct(
        productId,
        productName,
        productCategory,
        productPrice,
        productRating,
        productLikes,
        productDescription,
        productImage,
        productDate
      );

      var { error } = productResponse;
      if (error) {
        res.status(400).json({ error });
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteProduct(req, res, next) {
    try {
      const id = req.query._id;
      console.log(id);
      const productResponse = await ProductsDAO.deleteProduct(id);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
