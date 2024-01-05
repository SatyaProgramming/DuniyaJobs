package com.job_finder.utility;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

@Component
public class PasswordUtils {

	public static String generateRandomePWD() {
		String characters = "0123456789";
		String pwd = RandomStringUtils.random(6, characters);
		System.out.println(pwd);

		return pwd;
	}
}
