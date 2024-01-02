package com.job_finder.helperClass;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Data
public class Company {
	 private Long id;

	    private String companyName; // Adjust field name if needed
	    private String password;
	    private String location;
	    private String contactEmail;
	    private String contactPhone;
	    private String description;
	    private String industry;
	    private String status;
	    private String accStatus; 
	    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    private List<JobEntity> jobs;

}
