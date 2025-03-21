import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import ProductCategory from '../components/Product/ProductCategory'
import ProductCard from '../components/Product/ProductCard'
import ProductFilter from '../components/Product/ProductFilter'
import Breadcrumb from "../components/Breadcrumb";
import "../css/Product.css"

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); 
  const selectedCategory = searchParams.get("name"); 
  const [sorting, setSorting] = useState("newArrivals")

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:3000/products";
        if (selectedCategory) {
          url = `http://localhost:3000/products/category?name=${selectedCategory}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched Products:", data);
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [selectedCategory]); // Re-fetch when category changes

  const sortProducts = [...products].sort((a,b) => {
    if(sorting === "priceAscending"){
      return a.price - b.price;
    }
    if(sorting === "priceDescending"){
      return b.price - a.price;
    }
    return 0;
  })

  return (
    <>
      <Breadcrumb />
      <div className="product-page">
        <div className="category-section">
          <ProductCategory /> 
        </div>

        <div className="content-container">
          <div className="filter-section">
            <ProductFilter />
          </div>

          <div className="product-section">
            <div className="sort-product">
              <select onChange={(e) => setSorting(e.target.value)} value={sorting}>
                <option value="newArrivals">Sort by: New arrivals</option>
                <option value="priceAscending">Price: Ascending</option>
                <option value="priceDescending">Price: Descending</option>
              </select>
            </div>
            {loading ? (
              <h1 className="loading-message">Loading...</h1>
            ) : sortProducts.length === 0 ? (
              <h1 className="loading-message">No Product Found</h1>
            ) : (
              <div className="product-grid">
                {sortProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
