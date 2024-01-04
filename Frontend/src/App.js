import "./App.css";
import Subscription from "./Components/Subscription/Subscription";
import { Route, Routes } from "react-router-dom";
import Checkout from "./Components/CheckoutfrmSubscription/checkout";
import CheckoutCardDetails from "./Components/CheckoutfrmSubscription/CheckoutCardDetails";
import Otp from "./Components/CheckoutfrmSubscription/Otp";
import Confirmation from "./Components/CheckoutfrmSubscription/Confirmation";
import LoginPage from "../src/Components/RegisterAndLogin/login/LoginPage";
import RegisterPage from "../src/Components/RegisterAndLogin/register/RegisterPage";
import OtpPage from "../src/Components/RegisterAndLogin/otp/OtpPage";
// import Employement from "../src/Components/RegisterAndLogin/employement/Employement";
import Education from "../src/Components/RegisterAndLogin/education/Education";
import Body from "./Components/HomePageBody/Body";
import LandingNavbar from "./Components/LandingPage/LandingNavbar";
import Empnav from "./Components/foremployers/empnav";
import Recruters from "./Components/Recruter/Recruters";
import Topcompany from "./Components/TopCompany/Topcompany";
import Job from "./Components/JobsRecomndation/Job";
import SuccessFullapply from "./Components/JobsRecomndation/SuccessFullapply";
import RequiredAuth from "./hoc/RequiredAuth";
// import AuthProvider from "./hoc/Au"
import ResumePage from "./Components/ResumePage/ResumePage";
import UpdateProfile from "./Components/HomePageBody/UpdateProfile";
import Employment from "./Components/RegisterAndLogin/employement/Employment";
import CompanyRegisterForm from "./Components/foremployers/CompanyRegisterForm";
import CompanyLoginForm from "./Components/foremployers/CompanyLoginForm";
import CompanyOtp from "./Components/foremployers/CompanyOtp";
import CompanyHome from "./Components/foremployers/home/CompanyHome";

import AvailableJobs from "./Components/LandingPage/AvailableJobs";

import JobCatalog from "./Components/JobCatalog/JobCatalog";
import AdminRoutes from "./Components/Admin/AdminRouts";
import RequiredCompanyAuth from "./hoc/RequiredCompanyAuth";
import RequiredAdminAuth from "./hoc/RequiredAdminAuth";



// use StyleSheet.module for css

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/subscription" element={<Subscription />}></Route>
				<Route path="/checkout" element={<Checkout />}></Route>
				<Route path="/payment" element={<CheckoutCardDetails />}></Route>
				<Route path="/CaptureOtp" element={<Otp />}></Route>
				<Route path="/confirmation" element={<Confirmation />}></Route>
				{/* REGISTRATION AND LOGIN */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/otp" element={<OtpPage />} />
				<Route
					path="/home"
					element={
						<RequiredAuth>
							<Body />
						</RequiredAuth>
					}
				/>
				{/* <Route path="/employement" element={<Employement />} /> */}
				<Route path="/employement" element={<Employment/>}/>
				<Route path="/profile-update" element={<UpdateProfile/>}/>
				<Route path="/education" element={<Education />} />
				{/* REGISTRATION AND LOGIN */}
				<Route path="/" element={<LandingNavbar />}></Route>
				<Route path="/employer" element={<Empnav />}></Route>
				
				<Route path="/employer-registration" element={<CompanyRegisterForm />}></Route>
				<Route path="/employer-otp" element={<CompanyOtp />}></Route>
				
				<Route path="/employer-login" element={<CompanyLoginForm />}></Route>
				
				<Route
          path="/company-home"
          element={
            <RequiredCompanyAuth>
              <CompanyHome />
            </RequiredCompanyAuth>
          }
        />
				
				<Route path="/recruter" element={<Recruters />}></Route>
				<Route path="/topcompany" element={<Topcompany />}></Route>
				<Route path="/resume" element={<ResumePage />}></Route>
				{/* job */}

				<Route path="/available-job-list" element={<AvailableJobs />} />

				<Route path="/job-catalog" element={<JobCatalog/>}></Route>

				<Route path="/jobrecomandation" element={<Job />}></Route>
				<Route
					path="/applyjobsuccessfull"
					element={<SuccessFullapply />}
				></Route>
				 {/* Protected route for authenticated admin */}
				 <Route
          path="/admin/*"
          element={
            <RequiredAdminAuth>
              <AdminRoutes />
            </RequiredAdminAuth>
          }
        />
			</Routes>
		</div>
	);
}

export default App;
