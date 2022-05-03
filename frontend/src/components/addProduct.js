import React, { useState, useEffect } from "react";
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
  const [image, setImage] = useState("");

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
    setImage(event.target.value);
  };

  const createProduct = () => {
    const productDate = new Date();

    var product = {
      _id: id,
      name: name,
      category: category,
      price: price,
      rating: rating,
      likes: likes,
      description: description,
      image: image,
      date: productDate,
    };

    axios
      .post("http://localhost:5000/api/products", product)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location = "/";
  };

  return (
    <div className="submit-form">
      <div>
        <h4>Add New Product</h4>
        <br />
        <div className="form-group">
          <label htmlFor="description">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={name}
            onChange={handleNameChange}
          />
          <br />
          <label htmlFor="description">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            required
            value={category}
            onChange={handleCategoryChange}
          />
          <br />
          <label htmlFor="description">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            required
            value={price}
            onChange={handlePriceChange}
          />
          <br />
          <label htmlFor="description">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            required
            value={rating}
            onChange={handleRatingChange}
          />
          <br />
          <label htmlFor="description">Likes</label>
          <input
            type="number"
            className="form-control"
            id="likes"
            required
            value={likes}
            onChange={handleLikesChange}
          />
          <br />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={description}
            onChange={handleDescriptionChange}
          />
          <br />
          <label htmlFor="description">Image (src image)</label>
          <input
            type="text"
            className="form-control"
            id="image"
            required
            value={image}
            onChange={handleImageChange}
          />
          <br />
        </div>
        <Link to={{ pathname: "/" }} className="btn btn-outline-secondary">
          Cancel
        </Link>
        <button onClick={createProduct} className="btn btn-success mx-2">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
