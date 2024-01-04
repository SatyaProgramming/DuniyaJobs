package com.job_finder.response;

import lombok.Data;

@Data
public class JobPostList {

	private String title;
	private String type;
	private String experience;
	private int positions;
	private String skills;
	private String duration;
	private String annualSalary;
	private String dailyRate;
	private boolean remoteWork;
	private boolean onsite;
	private String description;

}
