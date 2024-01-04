package com.job_finder.controller;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.job_finder.entity.Company;
import com.job_finder.helperClass.CompanyLogin;
import com.job_finder.helperClass.CompanyRegister;
import com.job_finder.response.LoginMessage;
import com.job_finder.service.CompanyService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

	@Autowired
    private Logger logger; // Ensure proper injection

	@Autowired
	private CompanyService service;

	@PostMapping("/employer-register")
	public Boolean registerCompany(@RequestBody CompanyRegister form) {

		return service.addEmployer(form);
	}

	@GetMapping("/show-employers")
	public List<Company> showEmployers() {
		// Assuming you have a method in your service to fetch all employers
		return service.getAllEmployers();
	}

	@PostMapping("/company-login")
	public ResponseEntity<LoginMessage> loginCompany(@RequestBody CompanyLogin companyLogin) {
		LoginMessage loginResponse = service.loginEmployer(companyLogin);
		return new ResponseEntity<>(loginResponse, HttpStatus.OK);
	}

	@PostMapping("/company-verify-otp")
	public ResponseEntity<String> verifyOTP(@RequestParam("email") String email, @RequestParam("otp") String otp) {
		// Perform OTP verification logic here
		Boolean flag = service.getOtp(email, otp);

		if (flag) {
			return ResponseEntity.ok("OTP verification successful");
		} else {
			return ResponseEntity.badRequest().body("Invalid OTP");
		}
	}

	@PostMapping("/company-set-password")
	public ResponseEntity<String> setPassword(@RequestParam("email") String email,
	        @RequestParam("password") String password) {
	    try {
	        // Validation
	        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
	            return ResponseEntity.badRequest().body("Invalid input parameters");
	        }

	        // Perform password setting logic
	        String result = service.setPassword(email, password);

	        // Return a success response
	        return ResponseEntity.ok(result);
	    } catch (Exception e) {
	        // Log the exception for debugging purposes
	        logger.error("Error setting password for email: {}", email, e);

	        // Return an error response
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("An error occurred while setting the password");
	    }
	}

	@GetMapping("/companies")
	public ResponseEntity<List<Company>> getCompanyDtls(){
		List<Company> allEmployers = service.getAllEmployers();
		return new ResponseEntity<>(allEmployers,HttpStatus.ACCEPTED);
		
	}

	 @PutMapping("/status/{userId}")
	    public List<Company> updateUserStatus(@PathVariable Long userId, @RequestParam String newStatus) {
	        return service.updateUserStatus(userId, newStatus);
	    }
}
