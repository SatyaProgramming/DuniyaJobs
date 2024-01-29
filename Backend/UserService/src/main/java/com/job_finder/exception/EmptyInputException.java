package com.job_finder.exception;

@SuppressWarnings("serial")
public class EmptyInputException extends RuntimeException{
	
	public long errorid;
	public String ErrorNmae;
	public long getErrorid() {
		return errorid;
	}
	public void setErrorid(long errorid) {
		this.errorid = errorid;
	}
	public String getErrorNmae() {
		return ErrorNmae;
	}
	public void setErrorNmae(String errorNmae) {
		ErrorNmae = errorNmae;
	}
	

	public EmptyInputException() {
		
	}
	public EmptyInputException(long errorid, String errorNmae) {
		super();
		this.errorid = errorid;
		ErrorNmae = errorNmae;
	}
	
}
