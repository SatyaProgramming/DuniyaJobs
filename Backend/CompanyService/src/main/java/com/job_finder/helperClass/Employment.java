package com.job_finder.helperClass;

import lombok.Data;

@Data
public class Employment {

	private Long srno;
	private boolean employed;
    private String experienceYears;
    private String experienceMonths;
    private String prevCompany;
    private String prevJob;
    private String city;
    private String annualSalary;
    
}
