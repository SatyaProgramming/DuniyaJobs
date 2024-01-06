package com.job_finder.search;

import java.util.List;

import lombok.Data;

@Data
public class JobSearchCriteria {
	 private String skills;
	    private String experience;
	    private String country;
	    private String state;
	    private List<String> cities;
	    private String category; // Add filtering parameter
	    private String location;
}
