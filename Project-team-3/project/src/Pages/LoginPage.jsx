import React, { useEffect, useState } from "react";
import "./Pages.module.css";
import styles from "./Pages.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { InputLogin } from "../components/Inputlogin";
function LoginPage() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("logged") === "true") {
      navigate("/tasks");
    }
  }, []);

  async function login(e) {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5001/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    let data;
    data = await res.json();

    if (res.ok) {
      localStorage.setItem("username", data.user);
      localStorage.setItem("logged", loggedin);
      navigate("/tasks");
    } else {
      setError(data.message || "Invalid Username or Password");
    }
  }

  return (
    <div className={styles.mainPage}>
      <div className={styles.loginForm}>
        <form onSubmit={login}>
          <h1>Login</h1>
          {error && <div className={styles.error}>{error}</div>}
          <InputLogin
            type="text"
            placeholder="Username"
            Icon={FaUser}
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <InputLogin
            type="password"
            placeholder="Password"
            Icon={FaLock}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <div className={styles.remember}>
            <label>
              <input
                type="checkbox"
                checked={loggedin}
                onChange={(e) => setLoggedin(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
          <div className={styles.register}>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
