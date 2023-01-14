import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

function Search({ search, onChange }) {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={onChange}
      />
    </div>
  );
}

export default Search;
