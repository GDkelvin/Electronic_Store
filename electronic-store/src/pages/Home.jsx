import React, { useState, useEffect } from "react";
import ProductSlider from "../components/ProductSlider";
import laptop from "../assets/Laptop-Home.png";
import styles from "../css/Home.module.css";
import ProductCard from "../components/Product/ProductCard";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        console.log("Fetched Products:", data);

        setProducts(data);

        const now = new Date();
        const newProductsFiltered = data.filter(product => {
          const createdAt = new Date(product.created_at);
          const timeDiff = now - createdAt;
          return timeDiff <= 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        }).slice(0,5);

        const bestSellersFiltered = [...data]
          .sort((a, b) => b.sales_count - a.sales_count)
          .slice(0, 5);

        setNewProducts(newProductsFiltered);
        setBestSellers(bestSellersFiltered);

      } catch (e) {
        console.error("Failed to load products:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);
  let navigate = useNavigate();
  const navigateToProduct = () =>{
    navigate('/products');
  }
  return (
    <div className={styles["home"]}>
      {/* Landing Section */}
      <div className={styles["home-introduction"]}>
        <div className={styles["home-text"]}>
          <h1 style={{ fontSize: "64px" }}>GDkelvin</h1>
          <p style={{ fontSize: "32px" }}>
            "Join the <span style={{ color: "#FF6951" }}>digital revolution</span>"
          </p>
          <button onClick={navigateToProduct}>Explore more</button>
        </div>
        <div className={styles["home-image"]}>
          <img src={laptop} alt="Laptop" />
        </div>
      </div>

      {/* Product Slider */}
      {loading ? <h3>Loading products...</h3> : <ProductSlider products={products} />}

      {/* New Products */}
      <div className={styles["new-products"]}>
        <div className={styles["new-products-header"]}>
          <h2>New Products</h2>
        </div>
        <div className={styles["new-products-productCard"]}>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            newProducts.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      </div>

      {/* Best Seller */}
      <div className={styles["new-products"]}>
        <div className={styles["new-products-header"]}>
          <h2>Best Seller</h2>
        </div>
        <div className={styles["new-products-productCard"]}>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            bestSellers.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
