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
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    if (!username) {
      setError('username doesn’t exist')
    }else if (!email){
      setError('Email doesn’t exist')
    }else if(!password  ){
      setError('password doesn’t exist ')
    }else if(!cPassword  ){
    setError('confirm password doesn’t exist ')
    }else if(password != cPassword ){
  setError('password does not match')
}
    else{
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
    }
  }

  return (
    <div className="register__container">
      <form className="register__form" onSubmit={handleRegister}>
        <h2>Sign Up</h2>
        <p className="text-danger">{error}</p>
        <input
          type="text"
          placeholder="user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder=" email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder=" password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
