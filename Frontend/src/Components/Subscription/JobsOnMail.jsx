import React from 'react'
import style from './Subscription.module.css'


const JobsOnMail = () => {
  return (
    <div className={style.Resumemain}>
    <div>

    <div>
        <div className={style.Resumesub1}>
            <span className={style.ticksymbol}><i class="fa-solid fa-circle-check"></i></span>
            <div>Priority Access to Jobs on SMS/Mail</div>
        </div>
        <div className={style.resumesub2}>Get new jobs within <b>30 minutes</b>of being posted on MeriJob. The first 20% applicants are <b>4 times</b>  more likely to be shortlisted.</div>
    </div>
    
    <div>
        <div className={style.Resumesub1}>
            <span className={style.ticksymbol}><i class="fa-solid fa-circle-check"></i></span>
            <div>Handpicked jobs by MeriJob domain expert </div>
        </div>
        <div className={style.resumesub2}>Detailed conversation with MeriJob job expert to set your personalized job search criteria.</div>
    </div>

    </div>

    <div><img src="https://static.naukimg.com/s/7/123/i/howItWorksJobs.723bb485.png" alt="" /></div>
    </div>
  )
}

export default JobsOnMail