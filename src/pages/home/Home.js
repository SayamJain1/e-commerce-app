import React from "react";
import Products from "../../components/product/Products";
import Slider from "../../components/slider/Slider";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div>
      <Slider />
      <Products />
    </div>
  );
}

export default Home;
