// Home.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import MainSection from './MainSection';
import styles from './Home.module.css';
import Users from './SidebarComponents/Users';
import Settings from './SidebarComponents/Settings';

const Home = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <MainSection>
        {/* Update the parent route path to include "*" */}
        <Routes>
          {/* <Route path="/*" element={<Dashboard />} /> */}
          <Route path="/users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </MainSection>
    </div>
  );
};

export default Home;
