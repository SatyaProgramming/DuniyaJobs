package com.job_finder.exception;

public class ErrorMessage extends RuntimeException {
	
	private Exception errorName;

	public Exception getErrorName() {
		return errorName;
	}
	
	public void setErrorName(Exception errorName) {
		this.errorName = errorName;
	}

	public ErrorMessage(Exception e) {
		this.errorName=e;
	}


}
