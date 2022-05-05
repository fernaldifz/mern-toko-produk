import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleLikesChange = (event) => {
    setLikes(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const createProduct = () => {
    const product = new FormData();
    const productDate = new Date();

    product.append("_id", id);
    product.append("name", name);
    product.append("category", category);
    product.append("price", price);
    product.append("rating", rating);
    product.append("likes", likes);
    product.append("description", description);
    product.append("image", image);
    product.append("date", productDate);

    axios
      .post("http://localhost:5000/api/products", product)
      .then((res) => {
        console.log(res.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Product added!</h4>{" "}
          <Link to={"/"} className="btn btn-success">
            Back to Products List
          </Link>
        </div>
      ) : (
        <div>
          <h4>Add New Product</h4>
          <br />
          <form action="#" method="post" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="description">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
              <br />
              <label htmlFor="description">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={category}
                onChange={handleCategoryChange}
              />
              <br />
              <label htmlFor="description">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={handlePriceChange}
              />
              <br />
              <label htmlFor="description">Rating</label>
              <input
                type="number"
                className="form-control"
                id="rating"
                value={rating}
                onChange={handleRatingChange}
              />
              <br />
              <label htmlFor="description">Likes</label>
              <input
                type="number"
                className="form-control"
                id="likes"
                value={likes}
                onChange={handleLikesChange}
              />
              <br />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <br />
              <label htmlFor="formFile" className="form-label">
                Image
              </label>
              <div className="form-group">
                <input
                  className="form-control-file"
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={handleImageChange}
                ></input>
              </div>
              <br />
            </div>
          </form>
          <Link to={{ pathname: "/" }} className="btn btn-outline-secondary">
            Cancel
          </Link>
          <button onClick={createProduct} className="btn btn-success mx-2">
            Submit
          </button>
        </div>
      )}
      <br />
    </div>
  );
}

export default AddProduct;
