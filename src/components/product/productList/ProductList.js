import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "../../../redux/features/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [proPerPage, setProPerPage] = useState(6);
  // current Product
  const indexOfLastProduct = currentPage * proPerPage;
  const indexOfFirstProduct = indexOfLastProduct - proPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(
      SORT_PRODUCTS({
        products,
        sort,
      })
    );
  }, [dispatch, products, sort]);

  return (
    <div className={styles["product-list"]}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid} ` : `${styles.list}`}>
        {products.length ? (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        proPerPage={proPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};
export default ProductList;
