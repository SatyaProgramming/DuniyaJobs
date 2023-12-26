package com.job_finder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.job_finder.entity.Admin;
import com.job_finder.helperClass.LoginForm;
import com.job_finder.helperClass.RegistrationForm;
import com.job_finder.repository.AdminRepository;
import com.job_finder.response.LoginMessage;
import com.job_finder.service.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admins")
public class AdminController {

	 @Autowired
	 private AdminService adminService;
@Autowired
private AdminRepository ar;
	 
	 @GetMapping("/getall")
	 public List<Admin> getAllAdmin(){
		 return ar.findAll();
	 }
//	 ---------------------------------------------------
	 @PostMapping("/register")
		public Boolean registerAdmin(@RequestBody RegistrationForm form) {
			return adminService.registerAdmin(form);
		}
	 @PostMapping("/set-password")
	    public ResponseEntity<String> setPassword(@RequestParam("email") String email, @RequestParam("password") String password) {
	        String result = adminService.setPassword(email, password);
	        return ResponseEntity.ok(result);
	    }
	
	 @PostMapping("/verify-otp")
		public ResponseEntity<String> verifyOTP(@RequestParam("email") String email, @RequestParam("otp") String otp) {
		    // Perform OTP verification logic here
		    Boolean flag = adminService.getOtp(email, otp);

		    if (flag) {
		        return ResponseEntity.ok("OTP verification successful");
		    } else {
		        return ResponseEntity.badRequest().body("Invalid OTP");
		    }
		}
	 
	 @PostMapping("/login")
		public ResponseEntity<LoginMessage> loginEmployee(@RequestBody LoginForm loginForm) {
			LoginMessage loginResponse = adminService.loginAdmin(loginForm);
			return new ResponseEntity<>(loginResponse, HttpStatus.OK);

		}
}
