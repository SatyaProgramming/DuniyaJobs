import React from 'react'
import style from "./landingbody.module.css"
import JobList from './JobList'
const LandingBody = ({changealltohide}) => {
 
  return (
    <div onMouseEnter={changealltohide} className={style.lbody}>
        <div className={style.lb1}>
            <h1>Find your dream job now with Meri Job</h1>
            <p>5 lakh+ jobs for you to explore</p>
            <div className={style.searchcarrier}>
              <i class="fas fa-search"></i>
              <input type="text" placeholder='skills / designations / companies' className={style.lbinp1}/>
              <select className={style.lbinp2}>
                <option value="" disabled selected hidden>
                Select experience
                </option>
                <option value="">Fresher <span>(Less than 1 year)</span></option>
                <option value="">1 Year</option>
                <option value="">2 Year</option>
                <option value="">3 Year</option>
                <option value="">4 Year</option>
                <option value="">5 Year</option>
                <option value="">6 Year</option>
                <option value="">7 Year</option>
              </select>
              <input type="text" placeholder='Enter location' className={style.lbinp2} />
              <button className={style.lbbtn1}>Search</button>
            </div>
        </div>

        {/* <div className={style.lb2}>
           
            <button className={style.lbbtn2}>Register Now</button>
        </div> */}
        
        {/* <Landingslider1/> */}
        <JobList/>
    </div>
  )
}

export default LandingBody