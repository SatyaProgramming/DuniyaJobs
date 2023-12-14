import React from 'react'
import styles from './LandingPagerBanner.module.css'

const LandingPageBanner = () => {
  return (
    <section className={styles.LPBanner}>
        <div className={styles.navBtnsDiv}>
            <button className={styles.LPBannerBtns}>Hire People</button>
            <button className={styles.LPBannerBtns}>Available Jobs</button>
        </div>
    </section>
  )
}

export default LandingPageBanner