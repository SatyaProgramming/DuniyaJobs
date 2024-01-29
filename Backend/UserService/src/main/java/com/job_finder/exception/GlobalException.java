package com.job_finder.exception;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;



@ControllerAdvice
public class GlobalException {
	
	private static final Logger log = LoggerFactory.getLogger(GlobalException.class); 
	
	
//	@ExceptionHandler(DataNotFoundException.class)
//        public ResponseEntity<ErrorMessage> exceptionHandlerMethod(String dataNotFoundException){
//		
//		log.error("Exception Occured : " );
//		
//		ErrorMessage error = new ErrorMessage();
//		
//		error.setErrorCode(400);
//		error.setErrorName(dataNotFoundException);
//		error.setDate(LocalDateTime.now());
//		return new ResponseEntity <ErrorMessage>(error , HttpStatus.BAD_REQUEST);
		
//	}
	
	@ExceptionHandler(EmptyInputException.class)
	    public ResponseEntity<String> exceptionHandlerMethod3(EmptyInputException Exce){
		
		    log.error("Exception Occured : " );
		    
		      return new ResponseEntity <String>(Exce.getErrorNmae(), HttpStatus.BAD_GATEWAY);
		   
		}
		
	
	
	@ExceptionHandler(Exception.class)
         public ResponseEntity<String> exceptionHandlerMethod2(Exception errmsg){
		
        log.error("Exception Occured : " + errmsg);
	
		return new ResponseEntity <>(errmsg.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);		
		
	}
	
	

	

}



