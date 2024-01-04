package com.job_finder.controller.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.job_finder.helperClass.Company;

@FeignClient(name = "USER-API")
public interface CompanyFeignClient {

	 @GetMapping("/companies")
	 List<Company> getCompanyDtls();
	 
	 @PutMapping("/status/{userId}")
	 List<Company> updateUserStatus(@PathVariable("userId") Long userId, @RequestParam String newStatus);

}
