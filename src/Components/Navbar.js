import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const logout = () => {
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  };

  useEffect(() => {
    // استرجاع المستخدم من local storage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(storedUser);
  }, [localStorage.getItem('currentUser')]); // تحديث عندما يتغير localStorage

  return (
    <nav className="navbar ">
      <div className="logo">
        <Link to='/landing' id="firstLink">Hotel Booking</Link>
      </div>
      <button className="burger-menu" onClick={toggleMenu}>&#9776;</button>
      <ul className={showMenu ? "nav-links active " : "nav-links"}>
        {user ? (
          
          <Dropdown>
          <Dropdown.Toggle variant='#45b902' id="dropdown-basic">
          <FontAwesomeIcon icon={faUser} />
          {user.temp.username}
          </Dropdown.Toggle>
    
          <Dropdown.Menu style={{backgroundColor:'grey'}}>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={logout}>log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        ) : (
          <>
             <li style={{fontSize:'20px'}} ><Link onClick={() => setShowMenu(false)} to='/contact'>Contact</Link></li>
            <li style={{fontSize:'20px'}}><Link onClick={() => setShowMenu(false)} to='/login'>Login</Link></li>
            <li style={{fontSize:'20px'}}><Link onClick={() => setShowMenu(false)} to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;





