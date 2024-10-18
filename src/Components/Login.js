import React, { useState } from "react";
import "./Login.css"; // استيراد ملف الستايل
import axios from "axios";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const result = (await axios.post("https://hotel--backend.up.railway.app/login", user))
        .data;
      localStorage.setItem("currentUser", JSON.stringify(result));
      navigate("/home");
    } catch (error) {
      console.log("error", error);
      alert("There is wrong with email or password");
    }
  }

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleLogin}>
        <h2>تسجيل الدخول</h2>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">تسجيل الدخول</button>
      </form>
    </div>
  );
};

export default Login;
