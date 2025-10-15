import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./Pages/LoginPage"
import Register from "./Pages/Register";
import Tasks from "./Pages/Tasks"
import Chatbot from "./Pages/Chatbot"
import Pomodoro from "./Pages/Pomodoro"
import Contact from "./Pages/Contact"
import Forgot_Password from "./Pages/Forgot_password";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
