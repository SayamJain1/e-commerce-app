import React from "react";
import styles from "./Footer.module.scss";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

const date = new Date().getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.top_flex}>
        <div className={styles.top_left}>
          <ul>
            <li className={styles.li_heading}>Where To Buy</li>
            <li></li>
            <li>See Authorized Retailers</li>
          </ul>

          <ul>
            <li className={styles.li_heading}>Rewards</li>
            <li></li>
            <li>Join Now</li>
            <li>Learn More</li>
            <li>Manage Account</li>
          </ul>
        </div>
        <div className={styles.top_right}>
          <ul>
            <li className={styles.li_heading}>News & Info</li>
            <li></li>
            <li>Press Release</li>
            <li>About BEE</li>
            <li>Product Support</li>
            <li>Product Manuals</li>
            <li>Product Registration</li>
            <li>Newsletter sign up</li>
            <li>Accessibility and Use</li>
          </ul>

          <ul>
            <li className={styles.li_heading}>Other site</li>
            <li></li>
            <li>BEE Station</li>
            <li>BEE Footwear</li>
            <li>Chettist Chat app</li>
            <li>BEE Mobile</li>
            <li>Bee House</li>
            <li>Electronics</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom_flex}>
        <div className={styles.wrapper}>
          <img
            height={"18px"}
            src="https://cdn.pixabay.com/photo/2013/07/13/12/13/flag-159416_960_720.png"
            alt="region image"
          />
          <p>IND</p>
        </div>

        <div className={styles.social_link}>
          <AiFillFacebook style={{ fontSize: "2.5em" }} />
          <AiFillInstagram style={{ fontSize: "2.5em" }} />
          <AiFillYoutube style={{ fontSize: "2.5em" }} />
          <AiFillTwitterSquare style={{ fontSize: "2.5em" }} />
        </div>
      </div>
      <hr />
      <div className={styles.copyright}>&copy; {date} All Rights Reserved</div>
    </div>
  );
};

export default Footer;
