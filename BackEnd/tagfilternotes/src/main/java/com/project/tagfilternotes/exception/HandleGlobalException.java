package com.project.tagfilternotes.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class HandleGlobalException {
 
    
@ExceptionHandler(ResourceNotFound.class)
public ResponseEntity<?> handlerResourceNotFound(ResourceNotFound resourceNotFound){
  return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(resourceNotFound.getMessage());  
}

@ExceptionHandler(Exception.class)
public ResponseEntity<?> handleGlobalException(Exception exception){
  return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");  
}

}
