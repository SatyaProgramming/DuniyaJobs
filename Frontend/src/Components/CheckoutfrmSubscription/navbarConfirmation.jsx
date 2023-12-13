import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Checkout.module.css";
import {Text
} from "@chakra-ui/react";
const Navbaronfirmation = () => {
   const navigate= useNavigate();
	return (
		<div className={style.navbar}>
			<div>
				<div className={style.navbarlogo}>
					<Text
						onClick={() => navigate("/home")}
						
					>MeriJob</Text>
				</div>
			</div>
			<div className={style.navbarsub1}>
				<div>1. SHOPPING CART {`   `}</div>
				<div>
					<span>
						<i className="fa-solid fa-check"></i>
					</span>{" "}
					2. LOGIN {`   `}
				</div>
				<div>3. PAYMENT {`   `}</div>
				<div className={style.navbarsub11}>4. Order Confirmation</div>
			</div>

			<div className={style.navbar3}>
				<div className={style.navbarimgdiv}>
					<h2>MeriJob</h2>
				</div>
				<div className={style.navbar4}>
					<p>Buy Safely with MeriJob.com</p>
					<p className={style.navbarpara}>We support secure payment methods</p>
				</div>
			</div>
		</div>
	);
};

export default Navbaronfirmation;
