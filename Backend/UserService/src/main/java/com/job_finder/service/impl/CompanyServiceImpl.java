package com.job_finder.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.job_finder.entity.Company;
import com.job_finder.entity.UserDtls;
import com.job_finder.helperClass.CompanyLogin;
import com.job_finder.helperClass.CompanyRegister;
import com.job_finder.repository.CompanyRepository;
import com.job_finder.response.LoginMessage;
import com.job_finder.service.CompanyService;
import com.job_finder.utility.EmailUtils;
import com.job_finder.utility.PasswordUtils;

import jakarta.transaction.Transactional;

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
		BeanUtils.copyProperties(form, cmp);
		String tempPwd = PasswordUtils.generateRandomePWD();
		cmp.setPassword(tempPwd);
		cmp.setAccStatus("LOCKED");
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
		Company cmp = repository.findByContactEmail(email);
        if (cmp != null) {
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
		    if (cmp != null) {
		        // Check if the OTP matches the expected OTP (sent to the user)
		        if (otp.equals(cmp.getPassword()) && !"".equals(otp)) {
		            cmp.setAccStatus("UNLOCKED");
		            repository.save(cmp);
		            return true;
		    }
		}
		return false;
	}
}
