package com.job_finder.response;

import lombok.Data;

@Data
public class ProfileData {
	 private String name;
	    private String education;
	    private String institute;
	    private int completionPercentage;
	    private int detailsMissing;
	    private int searchAppearances;
	    private int recruiterAction;
	    private String boostMessage;
	    private String paidService;
}
