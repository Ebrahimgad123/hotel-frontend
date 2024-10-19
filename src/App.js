import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/login/Login";
import Register from "./Components/Register";
import Booking from "./Components/Booking";
import Profile from "./Components/Profile";
import LandingPage from "./Components/LandingPage";
import Contact from "./Components/Contact";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home/book/:roomId/:fromDate/:toDate"
            exact
            element={<Booking />}
          />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
