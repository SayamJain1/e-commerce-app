import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/features/authSlice";
import { selectIsloggedIn } from "../../redux/features/authSlice";
import { AdminLink } from "../admin&proctedOnly/AdminOnly";
import { selectCartItems } from "../../redux/features/cartSlice";

function Navbar() {
  const isLogin = useSelector(selectIsloggedIn);
  const cartNumber = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const uName = user.email.substring(0, user.email.indexOf("@"));
          setUserName(uName);
        } else {
          setUserName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : userName,
            userId: user.uid,
          })
        );
      } else {
        setUserName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logOutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("sign-out successfuly");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <header>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link to="/">
              <h2>Bee Store</h2>
            </Link>
          </div>
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <AdminLink>
                  <Link to="/admin">
                    <button className="--btn">Admin</button>
                  </Link>
                </AdminLink>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <Link to="/login">Login</Link>
                {isLogin ? (
                  <a href="#home" style={{ color: "orange" }}>
                    Hi, {userName}
                  </a>
                ) : null}
                <Link to="/register">Register</Link>
                <Link to="/" onClick={logOutUser}>
                  Log-out
                </Link>
              </span>
              <span className={styles.cart}>
                <Link to="/cart">
                  <FaShoppingCart size={20} />
                  <p>{cartNumber.length}</p>
                </Link>
              </span>
            </div>
          </nav>
          <div className={styles["menu-icon"]}>
            <span className={styles.cart}>
              <Link to="/cart">
                <FaShoppingCart size={20} />
                <p>0</p>
              </Link>
            </span>
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
