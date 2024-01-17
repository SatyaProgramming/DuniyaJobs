import React from 'react'
import EarthLogo from "../Assets/EarthLogo.gif"
import style from "./landingnav.module.css"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'

const UniversalNavBar = () => {
    const [isjob, setisjob] = useState(false)
    const [iscompany, setiscompany] = useState(false)
    const [isservices, setisservices] = useState(false)
    const [isresources, setisresources] = useState(false)
    const [isemployer, setisemployer] = useState(false)

    let navigate = useNavigate();

    let changealltohide = () => {
        setisjob(false)
        setiscompany(false)
        setisservices(false)
        setisresources(false)
        setisemployer(false)
    }

    let changeemployertodisplay = () => {
        setisresources(false)
        setisservices(false)
        setiscompany(false)
        setisjob(false)
        setisemployer(true)
    }
    let navigatetoemployer = (event) => {
        event.preventDefault();
        navigate("/employer", { replace: false })

    }
    let navigatetohome = (event) => {
        event.preventDefault();
        navigate("/", { replace: true })
    }
    let navigatetoregister = (event) => {
        event.preventDefault();
        navigate("/register")
    }

    let navigatetologin = (event) => {
        event.preventDefault();
        navigate("/login")
    }
    return (
        <div>
            <div>
                <div className={style.lnavbar}>
                    <div className={style.lnav1}>
                        <span className={`${style.logo} ${style.lphover}`} onMouseEnter={changealltohide} onClick={navigatetohome}><h1 className={style.landingLogo}><span className={style.dLogo}>D</span>uniya J<span className={style.oLogo}><img src={EarthLogo} alt="" className={style.earthLogo} /></span>bs</h1></span>
                    </div>
                    <div className={style.sublnav2} onMouseEnter={changealltohide}>
                        <div className={style.btncarrier} onMouseEnter={changealltohide}>
                            <button className={style.LPBannerBtns} onClick={navigatetologin} >Login</button>

                            <button className={style.LPBannerBtns} onClick={navigatetoregister}>Register</button>
                        </div>
                        <div className={style.lphover} onMouseEnter={changeemployertodisplay} onClick={navigatetoemployer}>
                            For employers
                            <i class="fa-solid fa-angle-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniversalNavBar