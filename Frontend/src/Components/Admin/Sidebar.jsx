// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Home Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/home" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/home/users" className={styles.navLink}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/home/company-action" className={styles.navLink}>
              Company
            </Link>
          </li>
          <li>
            <Link to="/admin/home/settings" className={styles.navLink}>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
