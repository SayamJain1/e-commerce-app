import React, { useState } from "react";
import styles from "./Pagination.module.scss";

function Pagination({
  currentPage,
  setCurrentPage,
  proPerPage,
  totalProducts,
}) {
  const pageNumbers = [];
  // Limit the page numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(1);
  const [maxNumberLimit, setMaxNumberLimit] = useState(1);
  const [minNumberLimit, setMinNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / proPerPage); i++) {
    pageNumbers.push(i);
  }

  // functions
  const paginate = (number) => {
    setCurrentPage(number);
  };

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    } else {
      return;
    }
    //next pages
    if (currentPage + 1 > maxNumberLimit) {
      setMaxNumberLimit(maxNumberLimit + pageNumberLimit);
      setMinNumberLimit(minNumberLimit + pageNumberLimit);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);

    if (
      (currentPage > 1 ? currentPage - 1 : currentPage) % pageNumberLimit ==
      0
    ) {
      setMaxNumberLimit(maxNumberLimit - pageNumberLimit);
      setMinNumberLimit(minNumberLimit - pageNumberLimit);
    }
  };

  return (
    <ul className={styles.pagination}>
      <li onClick={prevPage}>Prev</li>

      {pageNumbers.map((number) => {
        if (number <= maxNumberLimit && number > minNumberLimit) {
          return (
            <li onClick={() => paginate(number)} key={number}>
              {number}
            </li>
          );
        }
      })}

      <li onClick={nextPage}>Next</li>
      <p>{`page ${currentPage} of ${pageNumbers.length}`}</p>
    </ul>
  );
}

export default Pagination;
