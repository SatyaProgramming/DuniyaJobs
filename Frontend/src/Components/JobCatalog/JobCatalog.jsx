import React from 'react'
import jobCatalogData from '../Assets/jobCatalogData.json'
import Logo from '../Assets/Mahindra.png'
import styles from './JobCatalog.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames';
import Footer from '../HomePageFooter/Footer';
import Filterbox from './Filterbox';
import { Box } from '@chakra-ui/react';

const JobCatalog = () => {
    const jobListing = jobCatalogData.jobListing;
    const hanldeFavClick = (event) => {
        var x = event.currentTarget;
        var y = x.children[0].className;
        if (y === "fa fa-star-o") {
            event.currentTarget.children[0].className = "fa fa-star";
        }
        else {
            event.currentTarget.children[0].className = "fa fa-star-o";
        }
        //Remaining favourites logic over here
        //get id of card and save favourites using id and user id
    };
    return (
        <div>
            <div className={styles.CatalogContainer}>
                <Filterbox/>
                <div className={styles.job_listings_container}>
                    {jobListing.map((job, index) => (
                        <div key={index} className={styles.job_card}>
                            <div className={styles.cardtop}>
                                <img src={Logo} width='75' height='75' alt="" className="cardlogo" />
                                <div className="cardTopJobLoc">
                                    <strong><h2>{job.company_name}</h2></strong>
                                    <p><i class="fa fa-map-marker" aria-hidden="true"></i> {job.location}</p>
                                </div>
                            </div>
                            <div className="cardContent">
                                <p><strong>{job.job_role}</strong></p>
                                <p><strong>Job Type:</strong> {job.job_type}</p>
                                <p><strong>Experience:</strong> {job.experience}</p>
                                <p><strong>Positions:</strong> {job.positions}</p>
                                <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                                <p><strong>Duration:</strong> {job.duration}</p>
                                <p><strong>Annual Salary:</strong> {job.annual_salary}</p>
                                <p><strong>Daily Rate:</strong> {job.daily_rate}</p>
                                <p><strong>Remote Work:</strong> {job.remote_work}</p>
                                <p><strong>Onsite:</strong> {job.onsite}</p>
                                <p><strong>Description:</strong> {job.job_description}</p>
                            </div>
                            <div className={styles.cardFooter}>
                                <button className={styles.ApplyBtn}>Apply</button>
                                <div className={styles.socialLinks}>
                                    <a href='https://www.facebook.com/' target='blank' className={styles.facebookIcon}><FontAwesomeIcon icon={faFacebook} className={classNames(styles.facebookIcon, styles.icon)} /></a>
                                    <a href='https://twitter.com/i/flow/login' target='blank' className={styles.twitterIcon}><FontAwesomeIcon icon={faTwitter} className={classNames(styles.twitterIcon, styles.icon)} /></a>
                                    <a href='https://in.linkedin.com/' target='blank' className={styles.linkedInIcon}><FontAwesomeIcon icon={faLinkedin} className={classNames(styles.linkedInIcon, styles.icon)} /></a>
                                </div>
                                <button onClick={hanldeFavClick}><i class="fa fa-star-o" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobCatalog