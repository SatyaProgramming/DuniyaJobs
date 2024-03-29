import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Footer from "../HomePageFooter/Footer";
import Empbody from "./empbody";
import style from "./empnav.module.css"
import Empnumber from "./Empnumber";
import Empproduct from "./Empproduct";
import { Text } from "@chakra-ui/react";
import EarthLogo from "../Assets/EarthLogo.gif"

const Empnav = () => {
    const [isproduct, setisproduct] = useState(false)
    const [isnumber, setisnumber] = useState(false)
    let navigate = useNavigate()
    // let showprod = () => {
    //     setisproduct(true)
    //     setisnumber(false)
    // }
    // let shownumber = () => {
    //     setisnumber(true)
    //     setisproduct(false)
    // }
    let hideall = () => {
        setisnumber(false)
        setisproduct(false)
    }

    let navigatetohome = (event) => {
        event.preventDefault();
        navigate("/", { replace: true })
    }
    const navigateToLogin = () => {
        navigate("/employer-login");
    };

    const navigateToRegister = () => {
        navigate("/employer-registration");
    };
    return (
        <div>

            <div className={style.empnav}>
                <div className={style.subempnav1}>
                    <Text className={style.logoText} onClick={navigatetohome}
                    ><h1 className={style.landingLogo}><span className={style.dLogo}>D</span>uniya J<span className={style.oLogo}><img src={EarthLogo} alt="" className={style.earthLogo} /></span>bs</h1></Text>
                    {/* <p onMouseEnter={hideall}>Home</p>
                    <div className={style.subnav1} onMouseEnter={showprod}>
                        <p>Products</p>
                        <i class="fa-solid fa-angle-down"></i>
                    </div> */}
                </div>
                <div className={style.mediahide}>
                    {/* <div>
                        <p className={style.makesmall}>India Sales Toll Free (9:30 AM to 6:30PM)</p>
                    </div> */}
                    <div className={style.subempnav1}>

                        {/* <div>

                            <div className={style.subnav1} onMouseEnter={shownumber}>
                                <i class="fa-solid fa-phone"></i>
                                <p>1800-102-2558</p>
                                <i class="fa-solid fa-angle-down"></i>
                            </div>
                        </div>
                        <div className={style.subnav2} onMouseEnter={hideall}>
                            <i class="fa-solid fa-cart-arrow-down"></i>
                            <p>Cart</p>
                            <i class="fa-solid fa-angle-down"></i>

                        </div> */}
                        <div className={style.subnav3}>
                            <p onClick={navigateToLogin}>Login</p>
                            <i className="fa-solid fa-share-from-square"></i>
                            <p onClick={navigateToRegister}>Register</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Empproduct isproduct={isproduct} hideall={hideall} /> */}

            {/* <Empnumber isnumber={isnumber} hideall={hideall} /> */}
            <Empbody hideall={hideall} />
            <Footer />

        </div>
    );
};

export default Empnav;
