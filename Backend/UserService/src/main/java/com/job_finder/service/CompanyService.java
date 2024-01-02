package com.job_finder.service;

import java.util.List;

import com.job_finder.entity.Company;
import com.job_finder.helperClass.CompanyLogin;
import com.job_finder.helperClass.CompanyRegister;
import com.job_finder.response.LoginMessage;

public interface CompanyService {
    Boolean addEmployer(CompanyRegister form);
    
    List<Company> getAllEmployers();
    
    LoginMessage loginEmployer(CompanyLogin loginForm);

	String setPassword(String email, String password);

	Boolean getOtp(String email, String otp);
	
	List<Company> updateUserStatus(Long userId, String newStatus);
  
}
