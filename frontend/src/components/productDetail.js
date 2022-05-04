import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState({});

  const deleteProduct = () => {
    axios
      .delete("http://localhost:5000/api/products?_id=" + id)
      .then(() => {
        console.log("Delete successful");
      })
      .catch((error) => {
        console.log(error);
      });

    window.location = "/";
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/id/" + id)
      .then((res) => {
        setIsLoaded(true);
        setProduct(res.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="col-lg-4">
        <div className="card">
          <img
            className="card-img-top"
            src={"http://localhost:5000/" + product.image}
            style={{ objectFit: "cover" }}
            height="300px"
            alt="product"
          />
          <div className="card-body">
            <h4 className="card-title">{product.name}</h4>
            <p className="card-text">
              <strong>Category: </strong>
              {product.category}
              <br />
              <strong>Price: </strong>
              {product.price}
              <br />
              <strong>Rating: </strong>
              {product.rating}
              <br />
              <strong>Likes: </strong>
              {product.likes}
              <br />
              <strong>Description: </strong>
              {product.description}
            </p>

            <div className="row d-flex justify-content-around">
              <Link
                to={{ pathname: "/product_detail/" + id + "/edit" }}
                className="btn btn-primary col-lg-5 mx-1 mb-1"
              >
                Edit
              </Link>
              <button
                onClick={deleteProduct}
                className="btn btn-danger col-lg-5 mx-1 mb-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
