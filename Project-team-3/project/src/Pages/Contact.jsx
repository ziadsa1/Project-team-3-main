import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./pages.module.css";
function Contact() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }
  }, [username, navigate]);

  async function submit() {
    const res = await fetch("http://127.0.0.1:5001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title,email,username,message }),
    });
    const data = await res.json();
    console.log(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit();
  };

  return (
    <div className={styles.page}>
      <div>
        <NavBar />
      </div>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.contactText}>
            <span style={{marginLeft: 10}}>Contact US</span>
          </h2>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form">
            <label htmlFor="textarea" style={{marginLeft: 10, fontSize: "18px"}}>How can we help you?</label>
            <textarea
              name="textarea"
              id="textarea"
              placeholder="Description."
              rows="10"
              cols="50"
              required=""
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className={styles.form_submit_btn} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
