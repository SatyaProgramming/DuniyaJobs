package com.job_finder.response;

import lombok.Data;

@Data
public class LoginMessage {

	public String message;
	public Boolean status;
	public long srno;
	public LoginMessage(String message, Boolean status,Long srno) {
        this.message = message;
        this.status = status;
        this.srno=srno;
    }
}
