import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { FaCogs } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/features/productSlice";
import useFetchCollection from "../../hooks/useFetchCollection";
import spinner from "../../assets/spinner.gif";

function Products() {
  const [showFilter, setShowFilter] = useState(false);
  const { data } = useFetchCollection("products");

  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggelFilter = () => {
    setShowFilter(!showFilter)
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          {products ? (
            <ProductList products={products} />
          ) : (
            <img src={spinner} style={{ height: "25px" }} alt="" />
          )}
          <div className={styles.icon} onClick={toggelFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
