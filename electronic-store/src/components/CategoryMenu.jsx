// CategoryMenu.js
import React from "react";
import styles from "../css/CategoryMenu.module.css";

const CategoryMenu = ({ categories = [], products = [] }) => {
  return (
    <div className={styles.categoryMenu}>
      {/* Sidebar danh mục */}
      <div className={styles.sidebar}>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className={styles.sidebarItem}>{category}</li>
          ))}
        </ul>
      </div>

      {/* Nội dung bên phải */}
      <div className={styles.content}>
        <h3>Smart Phones</h3>
        <p className={styles.accessories}>Accessories</p>

        <div className={styles.products}>
          {products.map((product, index) => (
            <div key={index} className={styles.productItem}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <p>{product.name}</p>
            </div>
          ))}
        </div>

        <p className={styles.viewAll}>View all</p>
      </div>

    </div>
  );
};

export default CategoryMenu;
