import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPagerBanner.module.css';
import style from "../foremployers/empbody.module.css";
import EarthLogo from "../Assets/EarthLogo.gif"

const LandingPageBanner = () => {
  return (
    <section className={styles.LPBanner}>
      <h1 className={style.landingLogo}><span className={style.dLogo}>D</span>uniya J<span className={style.oLogo}><img src={EarthLogo} alt="" className={style.earthLogo} /></span>bs</h1>
      <h2 className={style.landingTagLine}>Best Platform to Find Quality Jobs</h2>
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
