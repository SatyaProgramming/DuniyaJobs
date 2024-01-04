package com.job_finder.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.job_finder.controller.feign.CompanyFeignClient;
import com.job_finder.entity.Admin;
import com.job_finder.helperClass.Company;
import com.job_finder.helperClass.LoginForm;
import com.job_finder.helperClass.RegistrationForm;
import com.job_finder.repository.AdminRepository;
import com.job_finder.response.LoginMessage;
import com.job_finder.service.AdminService;
import com.job_finder.utility.EmailUtils;
import com.job_finder.utility.PasswordUtils;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	CompanyFeignClient client;
	
	@Autowired
	private EmailUtils emailUtils;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public Boolean registerAdmin(RegistrationForm form) {
		String tempPwd = PasswordUtils.generateRandomePWD();
		Admin admin = new Admin();
		admin.setFullName(form.getName());
		admin.setEmailId(form.getEmailId());
		admin.setMobileNumber(form.getMobileNumber());
		admin.setPassword(tempPwd);
		admin.setAccStatus("LOCKED");

//			user.setPassword(this.passwordEncoder.encode(form.getPassword()));
		adminRepository.save(admin);
		String to = form.getEmailId();
		String subject = "Verification YOUR ACCOUNT";
		StringBuffer body = new StringBuffer();
		body.append("<h1>OTP for verify your account</h1><br>");
		body.append("<h3>" + tempPwd + "</h3>");
		emailUtils.sendMail(to, subject, body.toString());

		return true;
	}

	@Override
	public Boolean getOtp(String email, String otp) {
	    Optional<Admin> adminOptional = adminRepository.findByEmailId(email);

	    // Check if the user is found
	    if (adminOptional.isPresent()) {
	        Admin admin = adminOptional.get();

	        // Check if the OTP matches the expected OTP (sent to the user)
	        if (otp.equals(admin.getPassword()) && !"".equals(otp)) {

	            // Update account status (if needed)
	            admin.setAccStatus("UNLOCKED");

	            // Save the updated user entity to the database
	            adminRepository.save(admin);

	            return true;
	        }
	    }

	    // If any of the conditions fail, return false
	    return false;
	}

	@Override
	public String setPassword(String email, String password) {
	    Optional<Admin> adminOptional = adminRepository.findByEmailId(email);
	    
	    if (adminOptional.isPresent()) {
	        Admin admin = adminOptional.get();
	        admin.setPassword(password);
	        adminRepository.save(admin);
	        return "Password set successfully";
	    } else {
	        return "User not found";
	    }
	}


	@Override
	public LoginMessage loginAdmin(LoginForm loginForm) {
	    Optional<Admin> adminOptional = adminRepository.findByEmailId(loginForm.getEmail());

	    if (adminOptional.isPresent()) {
	        Admin admin = adminOptional.get();
	        return authenticateUser(loginForm, admin);
	    } else {
	        return new LoginMessage("Email not exists", false, null);
	    }
	}

	private LoginMessage authenticateUser(LoginForm loginForm, Admin admin) {
	    String encodedPassword = admin.getPassword();

	    if (passwordEncoder.matches(loginForm.getPassword(), encodedPassword)) {
	        Optional<Admin> authenticatedAdmin = adminRepository.findOneByEmailIdAndPassword(
	                loginForm.getEmail(), encodedPassword);

	        if (authenticatedAdmin.isPresent()) {
	            return new LoginMessage("Login Success", true, authenticatedAdmin.get().getId());
	        } else {
	            return new LoginMessage("Login Failed", false, null);
	        }
	    } else {
	        return new LoginMessage("Password Not Match", false, null);
	    }
	}

	@Override
	public List<Company> updateUserStatus(Long companyId, String newStatus) {
		// TODO Auto-generated method stub
		return client.updateUserStatus(companyId, newStatus);
	}

}
