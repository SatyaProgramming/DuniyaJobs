// Dashboard.js
import React from 'react';
import styles from './Dashboard.module.css';  // Import your CSS module

const Dashboard = () => {
  // Sample static data
  const data = [
    { label: 'Total Users', value: 1000 },
    { label: 'Revenue', value: '$50,000' },
    { label: 'Orders', value: 500 },
    // Add more data points as needed
  ];

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <div className={styles.dataContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.dataItem}>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
