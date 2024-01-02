package com.job_finder.helperClass;

import java.time.LocalDateTime;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
@Data 
public class JobEntity {
	 private Long id;

	    private String title;
	    private String description;
	    private String type;
	    private String experience;
	    private int positions;
	    private String skills;
	    private String duration;
	    private String annualSalary;
	    private String dailyRate;
	    private boolean remoteWork;
	    private boolean onsite;

	    @ManyToOne
	    @JoinColumn(name = "companyId")
	    private Company company;
	    private LocalDateTime createdDate;
	    private LocalDateTime updatedDate;

	    private String requirements;
	    
	    private Integer views;
}
