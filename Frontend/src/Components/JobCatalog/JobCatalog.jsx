import React, { useEffect, useState } from 'react';
import Logo from '../Assets/Mahindra.png';
import styles from './JobCatalog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames';
import axios from 'axios';
import { Button, Container, Input } from '@chakra-ui/react';

const JobCatalog = () => {
  const [jobListing, setJobListing] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, size, searchTerm]);

  const fetchData = () => {
    axios.get(`http://localhost:8081/get-job-list?page=${page}&size=${size}`)
      .then(response => {
        const filteredJobs = searchTerm
          ? response.data.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
          : response.data;

        setJobListing(filteredJobs);
      })
      .catch(error => {
        console.error('Error fetching job data:', error);
      });
  };

  const handleFavClick = (event) => {
    const x = event.currentTarget;
    const y = x.children[0].className;
    if (y === "fa fa-star-o") {
      x.children[0].className = "fa fa-star";
    } else {
      x.children[0].className = "fa fa-star-o";
    }
    // Remaining favorites logic here
    // get id of card and save favorites using id and user id
  };

  const handlePageChange = (newPage) => {
    // Ensure the page is not negative
    setPage(Math.max(0, newPage));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Container textAlign='center'>
        <Input placeholder='Search by job title' onChange={handleSearch} />
      </Container>
      <div className={styles.job_listings_container}>
        {jobListing.map((job) => (
          <div key={job.id} className={styles.job_card}>
            <div className={styles.cardtop}>
              <img src={Logo} width='75' height='75' alt="" className="cardlogo" />
              <div className="cardTopJobLoc">
                <strong><h2>{job.title}</h2></strong>
                <p><i className="fa fa-map-marker" aria-hidden="true"></i> {job.description}</p>
              </div>
            </div>
            <div className="cardContent">
              {/* (your existing card content) */}
            </div>
            <div className={styles.cardFooter}>
              <Button className={styles.ApplyBtn}>Apply</Button>
              <div className={styles.socialLinks}>
                <a href='https://www.facebook.com/' target='blank' className={styles.facebookIcon}>
                  <FontAwesomeIcon icon={faFacebook} className={classNames(styles.facebookIcon, styles.icon)} />
                </a>
                <a href='https://twitter.com/i/flow/login' target='blank' className={styles.twitterIcon}>
                  <FontAwesomeIcon icon={faTwitter} className={classNames(styles.twitterIcon, styles.icon)} />
                </a>
                <a href='https://in.linkedin.com/' target='blank' className={styles.linkedInIcon}>
                  <FontAwesomeIcon icon={faLinkedin} className={classNames(styles.linkedInIcon, styles.icon)} />
                </a>
              </div>
              <button onClick={handleFavClick}><i className="fa fa-star-o" aria-hidden="true"></i></button>
            </div>
          </div>
        ))}
      </div>
      <Container textAlign='center'>
        <Button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</Button>
        <span>Page {page + 1}</span>
        <Button onClick={() => handlePageChange(page + 1)}>Next</Button>
        {/* Pagination controls */}
      </Container>
    </div>
  );
};

export default JobCatalog;
