import React from "react";
import styles from "./Loader.module.scss";
import ReactDOM from "react-dom";

function Loader() {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <h3 className={styles.loader}>Loading...</h3>
    </div>,
    document.getElementById("loader")
  );
}

export default Loader;
