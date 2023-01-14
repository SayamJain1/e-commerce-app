import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CAT,
} from "../../../redux/features/filterSlice";
import { selectProducts } from "../../../redux/features/productSlice";
import styles from "./ProductFilter.module.scss";

function ProductFilter() {
  const [brand, setBrand] = useState("All");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const allCategories = ["All", ...new Set(products.map((p) => p.category))];
  const allBrands = ["All", ...new Set(products.map((p) => p.brand))];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  const filterProducts = (cat) => {
    dispatch(FILTER_BY_CAT({ products, category: cat }));
  };

  const clearFilters = () => {
    setBrand("All");
  };

  return (
    <div className={styles.filter}>
      <h2>Categories</h2>
      <div className={styles.category}>
        {allCategories.map((cat) => (
          <button key={cat} type="button" onClick={() => filterProducts(cat)}>
            &#8250; {cat}
          </button>
        ))}
      </div>
      <h2>Brand</h2>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      {/* <h2>price</h2>
      <p>1900</p>
      <div className={styles.price}>
        <input type="range" name="price" min="100" max="10000" />
      </div> */}
      <br />
      <button className="--btn --btn-danger" onClick={clearFilters}>
        Clear filters
      </button>
    </div>
  );
}

export default ProductFilter;
