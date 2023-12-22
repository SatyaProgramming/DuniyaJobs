import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPagerBanner.module.css';

const LandingPageBanner = () => {
  return (
    <section className={styles.LPBanner}>
      <div className={styles.navBtnsDiv}>
        <button className={styles.LPBannerBtns}>Hire People</button>
        <Link to="/job-catalog">
          <button className={styles.LPBannerBtns}>Available Jobs</button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPageBanner;
