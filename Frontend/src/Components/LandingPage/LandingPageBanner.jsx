import React from 'react';
import { Link } from 'react-router-dom'; // Don't forget to import Link
import styles from './LandingPagerBanner.module.css';

const LandingPageBanner = () => {
  return (
    <section className={styles.LPBanner}>
      <div className={styles.navBtnsDiv}>
        <button className={styles.LPBannerBtns}>Hire People</button>
        <Link to="/available-job-list">
          <button className={styles.LPBannerBtns}>Available Jobs</button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPageBanner;
