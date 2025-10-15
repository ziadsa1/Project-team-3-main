import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "./components.module.css";
import bookIcon from "../../public/book.png";
export default function NavBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  useEffect(() => {
    if (!username) navigate("/");
  }, [username, navigate]);
  
  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("logged");
    navigate("/");
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.brand}>
        <img src={bookIcon} alt="brand logo" className={styles.brandicon} />
        <span className={styles.brandname}>Ctrl+ S(tudy)</span>
      </div>
      <nav>
        <Link to="/tasks">Tasks</Link>
        <Link to="/pomodoro">Pomodoro</Link>
        <Link to="/chatbot">Chat Bot</Link>
        <Link to="/contact">Contact us</Link>
      </nav>
      <div className={styles.pfp}>
        <div className={styles.userinfo}>
          <FaUserCircle className={styles.pfpicon} />
          <span className={styles.username}>{username}</span>
        </div>
        <button className={styles.outbtn} onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}