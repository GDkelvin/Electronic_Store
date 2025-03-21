import React, { useEffect, useState } from "react";
import ProductCategory from '../components/Product/ProductCategory'
import ProductCard from '../components/Product/ProductCard'
import ProductFilter from '../components/Product/ProductFilter'
import Breadcrumb from "../components/Breadcrumb";
import "../css/Product.css"

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        console.log("Fetched Products:", data);
        setProducts(data);
        setLoading(false);
      } catch (e) {
        console.error("fail to load product: ", e);
      }
    };
    fetchProduct();
  },[])
  
  return (
    <>
      <Breadcrumb></Breadcrumb>
      <div className="product-page">
        <div className="category-section">
          <ProductCategory></ProductCategory>
        </div>

        <div className="content-container">
          <div className="filter-section">
            <ProductFilter />
          </div>

          <div className="product-section">
            <div className="sort-product">
              <select>
                <option value="newArrivals">Sort by: New arrivals</option>
                <option value="priceAscending">Price: Ascending</option>
                <option value="priceDescending">Price: Descending</option>
              </select>
            </div>
            {products.length === 0 ? (
              <h1 className="loading-message">No Product Found</h1>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Product