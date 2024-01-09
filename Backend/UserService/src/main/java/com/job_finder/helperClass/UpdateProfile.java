package com.job_finder.helperClass;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfile {
	private Long uid;
	private String fullName;
	private String mobileNumber;
	@Lob
	private byte[] resume;
	private boolean employed;
	private String experienceYears;
	private String experienceMonths;
	private String prevCompany;
	private String prevJob;
	private String city;
	private String annualSalary;
	
	
	private String profileImage;
}
