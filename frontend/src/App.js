import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ProductDetail from "./components/productDetail";
import ProductsList from "./components/productsList";
import AddProduct from "./components/addProduct";
import EditProduct from "./components/editProduct";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <a href="/" className="navbar-brand">
          Products List
        </a>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/new_product"} className="nav-link">
              Add New Product
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3 d-flex flex-column min-vh-100">
        <Routes>
          <Route exact path="/" element={<ProductsList />} />
          <Route path="/new_product" element={<AddProduct />} />
          <Route exact path="/product_detail/:id" element={<ProductDetail />} />
          <Route path="/product_detail/:id/edit" element={<EditProduct />} />
        </Routes>
      </div>
      <div className="bg-secondary mt-auto">
        <div className="container mt-3 p-3 text-white">Fernaldi Fauzie</div>
      </div>
    </div>
  );
}

export default App;
