package com.job_finder.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.job_finder.entity.Company;
import com.job_finder.helperClass.CompanyLogin;
import com.job_finder.helperClass.CompanyRegister;
import com.job_finder.repository.CompanyRepository;
import com.job_finder.response.LoginMessage;
import com.job_finder.service.CompanyService;
import com.job_finder.utility.EmailUtils;
import com.job_finder.utility.PasswordUtils;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyRepository repository;
	
	@Autowired
	private EmailUtils emailUtils;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	
	public Boolean addEmployer(CompanyRegister form) {
		Company cmp = new Company();
		String tempPwd = PasswordUtils.generateRandomePWD();
		cmp.setCompanyName(form.getCompanyName());
		cmp.setContactEmail(form.getContactEmail());
		cmp.setContactPhone(form.getContactPhone());
		cmp.setPassword(tempPwd);
		cmp.setAccStatus("LOCKED");
		cmp.setStatus("inactive");
		repository.save(cmp);
		String to=form.getContactEmail();
		
		String subject="Verification YOUR ACCOUNT";
		
		StringBuffer body=new StringBuffer();
			body.append("<h1>OTP for verify your account</h1><br>")	;
		body.append("<h3>"+tempPwd+"</h3>");
		emailUtils.sendMail(to, subject, body.toString());
		
		return true;
	}

	@Override
	public List<Company> getAllEmployers() {
		return repository.findAll();
	}

	@Override
	public LoginMessage loginEmployer(CompanyLogin loginForm) {
		Company cmp = repository.findByContactEmail(loginForm.getContactEmail());
		if (cmp != null) {
			String password = loginForm.getPassword();
			String encodedPassword = cmp.getPassword();
//			Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
			if (encodedPassword.equals(password)) {
				Optional<Company> employer = repository.findOneByContactEmailAndPassword(loginForm.getContactEmail(),
						encodedPassword);
				if (employer.isPresent()) {
					return new LoginMessage("Login Success", true, cmp.getId());
				} else {
					return new LoginMessage("Login Failed", false, null);
				}
			} else {
				return new LoginMessage("Password Not Match", false, null);
			}
		} else {
			return new LoginMessage("Email not exists", false, null);
		}
	}

	@Override
	public String setPassword(String email, String password) {
	    if (password == null || password.isEmpty()) {
	        return "Password cannot be null or empty";
	    }

	    Company cmp = repository.findOneByContactEmail(email);
	    if (cmp != null) {
	        // Implement password hashing here before setting
	        // For example, using BCryptPasswordEncoder from Spring Security
	        // BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	        // cmp.setPassword(encoder.encode(password));

	        // For illustration purposes, setting the plain text password
	        cmp.setPassword(password);

	        repository.save(cmp);
	        return "Password set successfully";
	    } else {
	        return "User not found";
	    }
	}


	@Override
	public Boolean getOtp(String email, String otp) {
		 Company cmp = repository.findByContactEmail(email);
		 if (cmp != null && !"".equals(otp)) {
		        // Check if the OTP matches the expected OTP (sent to the user)
			 if (otp.equals(cmp.getPassword()) && !cmp.getAccStatus().equals("UNLOCKED")) {
		            cmp.setAccStatus("UNLOCKED");
		            repository.save(cmp);
		            return true;
		    }
		}
		return false;
	}

	@Override
	public List<Company> updateUserStatus(Long companyId, String newStatus) {
		Company existingUser = repository.findById(companyId)
	                .orElseThrow(() -> new RuntimeException("User not found with id: " + companyId));

	        // Update company status fields based on the updatedUser
	      existingUser.setStatus(newStatus);
	       

	      repository.save(existingUser);
		return repository.findAll();
	}
}
