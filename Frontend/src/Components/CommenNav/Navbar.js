// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS file

const Navbar = ({ navItems }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.url}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
