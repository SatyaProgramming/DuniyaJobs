package com.job_finder.helperClass;

import lombok.Data;

@Data
public class UserUnlockForm {

	private String email;
	private String tempPwd;
	private String newPwd;
	private String conformPwd;
	
}
