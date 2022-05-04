import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/id/" + id)
      .then((res) => {
        setIsLoaded(true);
        setName(res.data.name);
        setCategory(res.data.category);
        setPrice(res.data.price);
        setRating(res.data.rating);
        setLikes(res.data.likes);
        setDescription(res.data.description);
        setImage(res.data.image);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [id]);

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

  const updateProduct = () => {
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
      .put("http://localhost:5000/api/products", product)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location = "/product_detail/" + id;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="submit-form">
        <div>
          <h4>Edit Product</h4>
          <br />
          <form action="#" method="post" encType="multipart/form-data">
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
          <Link
            to={{ pathname: "/product_detail/" + id }}
            className="btn btn-outline-secondary"
          >
            Cancel
          </Link>
          <button onClick={updateProduct} className="btn btn-success mx-2">
            Submit
          </button>
        </div>
        <br />
      </div>
    );
  }
}

export default EditProduct;
