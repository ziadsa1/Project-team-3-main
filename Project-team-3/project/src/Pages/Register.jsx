import React, { useState } from "react";
import "./Pages.module.css";
import styles from "./Pages.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { InputLogin } from "../components/Inputlogin";
export let loggedIn = false;
function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function register(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5001/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password, email}),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/");
      } 
      else setError(data.message);
    } 
    catch (error) {
      setError(data.message);
    }
  }
  return (
    <div className={styles.mainPage}>
      <div className={styles.loginForm} style={{width: 400}}>
        <form onSubmit={register}>
          <h1>Register</h1>
          {error && <div className={styles.error}>{error}</div>}
          <InputLogin
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <InputLogin
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <button type="submit">Register</button>
          <div className={styles.register}>
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
