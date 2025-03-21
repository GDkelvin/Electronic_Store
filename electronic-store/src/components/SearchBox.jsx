import React, { useState } from "react";
import styles from "../css/SearchBox.module.css";

const SearchBox = ({ products = [], onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className={styles.searchBox}>
            <div className={styles.searchHeader}>
                <input
                    type="text"
                    placeholder="Search for a product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className={styles.exitBtn} onClick={onClose}>✖</button>
            </div>

            <div className={styles.results}>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className={styles.productItem}>
                            <div className={styles.productInfo}>
                                <p className={styles.productName}>{product.name}</p>
                                <p className={styles.productPrice}>{product.price}đ</p>
                                {product.oldPrice && (
                                    <p className={styles.productOldPrice}>{product.oldPrice}đ</p>
                                )}
                            </div>
                            <img src={product.image} alt={product.name} className={styles.productImage} />
                        </div>
                    ))
                ) : (
                    <p className={styles.noResults}>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchBox;