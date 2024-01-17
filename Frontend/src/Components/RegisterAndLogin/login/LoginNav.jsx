import { Box, Flex, Image, HStack, Text } from "@chakra-ui/react";
import React from "react";
import style from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
const LoginNav = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Flex className={style.navbarLoginBox}>
				<Box p="4">
				<span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/")}>MeriJob</span>

				</Box>
				<HStack gap="10">
					<Text cursor="pointer" _hover={{ p:"3",bg:"gray.200",color:"blue" }} fontSize="sm">JOBS</Text>
					<Text cursor="pointer" _hover={{ p:"3",bg:"gray.200",color:"blue" }} fontSize="sm">RECRUITERS</Text>
					<Text cursor="pointer" _hover={{ p:"3",bg:"gray.200",color:"blue" }} fontSize="sm">COMPANIES</Text>
					<Text cursor="pointer" _hover={{ p:"3",bg:"gray.200",color:"blue" }} fontSize="sm">TOOLS</Text>
					<Text cursor="pointer" _hover={{ p:"3",bg:"gray.200",color:"blue" }} fontSize="sm">SERVICES</Text>
					<Text cursor="pointer" _hover={{ p:"3",bg:"gray.200",color:"blue" }} fontSize="sm">MORE</Text>
					<Text cursor="pointer" _hover={{ p:"3",bg:"gray.200",color:"blue" }} fontSize="sm">LOGIN</Text>
					<Text cursor="pointer" _hover={{ p:"3",bg:"gray.200",color:"blue" }} fontSize="sm">FOR EMPLOYERS</Text>
				</HStack>
			</Flex>
		</div>
	);
};

export default LoginNav;
