import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
let products;

export default class ProductsDAO {
  static async injectDB(conn) {
    if (products) {
      return;
    }
    try {
      products = await conn
        .db(process.env.PRODUCTS_NS)
        .collection("products_and_description");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in productsDAO: ${e}`
      );
    }
  }

  static async getProducts({
    filters = null,
    page = 0,
    productsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("category" in filters) {
        query = { category: { $eq: filters["category"] } };
      }
    }

    let cursor;

    try {
      cursor = await products.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { productsList: [], totalNumProducts: 0 };
    }

    const displayCursor = cursor
      .limit(productsPerPage)
      .skip(productsPerPage * page);

    try {
      const productsList = await displayCursor.toArray();
      const totalNumProducts = await products.countDocuments(query);

      return { productsList, totalNumProducts };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { productsList: [], totalNumProducts: 0 };
    }
  }

  static async getProductByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: ObjectId(id),
          },
        },
      ];
      return await products.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getProductByID: ${e}`);
      throw e;
    }
  }

  static async getCategories() {
    let categories = [];
    try {
      categories = await products.distinct("category");
      return categories;
    } catch (e) {
      console.error(`Unable to get categories, ${e}`);
      return categories;
    }
  }

  static async addProduct(
    productName,
    productCategory,
    productPrice,
    productRating,
    productLikes,
    productDescription,
    productImage,
    productDate
  ) {
    try {
      const productDoc = {
        name: productName,
        category: productCategory,
        price: productPrice,
        rating: productRating,
        likes: productLikes,
        description: productDescription,
        image: productImage,
        date: productDate,
      };

      return await products.insertOne(productDoc);
    } catch (e) {
      console.error(`Unable to post product: ${e}`);
      return { error: e };
    }
  }

  static async updateProduct(
    productId,
    productName,
    productCategory,
    productPrice,
    productRating,
    productLikes,
    productDescription,
    productImage,
    productDate
  ) {
    try {
      const updateProduct = await products.updateOne(
        { _id: ObjectId(productId) },
        {
          $set: {
            name: productName,
            category: productCategory,
            price: productPrice,
            rating: productRating,
            likes: productLikes,
            description: productDescription,
            image: productImage,
            date: productDate,
          },
        }
      );

      return updateProduct;
    } catch (e) {
      console.error(`Unable to update product: ${e}`);
      return { error: e };
    }
  }

  static async deleteProduct(id) {
    try {
      const deleteResponse = await products.deleteOne({
        _id: ObjectId(id),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete product: ${e}`);
      return { error: e };
    }
  }
}
