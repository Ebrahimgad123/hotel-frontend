import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    if (
      password === cPassword &&
      username !== "" &&
      email !== "" &&
      password !== "" &&
      cPassword !== ""
    ) {
      const user = {
        username,
        email,
        password,
        cPassword,
      };

      try {
        await axios.post("https://hotel--backend.up.railway.app/api/register", user);
        alert("تم التسجيل بنجاح");
        setUsername("");
        setEmail("");
        setPassword("");
        setCPassword("");
        // Redirect to the login page after successful registration
        navigate("/login");
      } catch (error) {
        console.log("error", error);
        alert("حدث خطأ أثناء التسجيل");
      }
    } else {
      alert("هناك بيانات غير صحيحة، يرجى إدخال بيانات صحيحة");
    }
  }

  return (
    <div className="register__container">
      <form className="register__form" onSubmit={handleRegister}>
        <h2>تسجيل حساب جديد</h2>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder=" كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="تأكيد كلمة المرور"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
        />

        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
};

export default Register;
