import {
	Button,
	Divider,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import style from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess, loginFailure } from '../storeLogin/actionsLogin';
const LoginForm = () => {
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	const [loginCreds, setLoginCreds] = useState({
		email: "",
		password: ""
	});

	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLoginCreds({ ...loginCreds, [name]: value });
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:8081/login', loginCreds);
			// console.log(response.data);
			const userData = response.data;
			const { srno } = userData;
			sessionStorage.setItem('srno',srno);
			// Dispatch a different action for successful login
			dispatch(loginSuccess(userData));
	
			// Navigate to the home page or perform any other necessary actions
			navigate("/home");
		} catch (error) {
			console.error(error.response.data);
			// You can dispatch an action for a failed login if needed
			dispatch(loginFailure());
		}
	};
	
	

	// const { isAuth } = useSelector((state) => state.login);

	// useEffect(() => {
	// 	if (isAuth) {
	// 		navigate("/home");
	// 	}
	// }, [navigate, isAuth]);

	return (
		<div>
			<Heading size="md">Login</Heading>

			<form action="submit" onSubmit={handleLoginSubmit}>
				<FormControl className={style.formLogin} isRequired>
					<div>
						<FormLabel fontSize="sm" htmlFor="email">
							Email ID 
						</FormLabel>
						<Input
							value={loginCreds.email}
							onChange={handleLoginChange}
							type="email"
							name="email"
							placeholder="Enter Email ID "
						/>
					</div>

					<div>
						<FormLabel fontSize="sm" htmlFor="password">
							Password
						</FormLabel>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								type={show ? "text" : "password"}
								placeholder="Enter password"
								name="password"
								value={loginCreds.password}
								onChange={handleLoginChange}
							/>
							<InputRightElement width="4.5rem">
								<Button
									bg="white"
									color="blue"
									h="1.75rem"
									size="sm"
									onClick={handleClick}
								>
									{show ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
						<FormHelperText color="blue" cursor="pointer" ml="200px">
							Forgot password?
						</FormHelperText>
					</div>

					<div>
						<Button colorScheme="blue" my="5" w="300px" type="submit">
							Login
						</Button>
					</div>

					<div>
						<Button
							colorScheme="blue"
							variant="link"
							size="sm"
							className={style.GoogleButton}
						>
							Use OTP to login
						</Button>
					</div>

					<div className={style.googleDividerDiv}>
						<Divider />
						<div className={style.GoogleDividerORLogin}>OR</div>
						<Button
							className={style.GoogleButton}
							leftIcon={<FcGoogle />}
							colorScheme="blue"
							variant="outline"
							borderRadius="20px"
						>
							Sign in with Google
						</Button>
					</div>
				</FormControl>
			</form>
		</div>
	);
};

export default LoginForm;
