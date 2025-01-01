package com.eazybytes.accounts.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundExcecption extends RuntimeException{
    public ResourceNotFoundExcecption(String resourceName, String fieldName, String fieldValue){
        super(String.format("%s was not found for field %s with value %s", resourceName, fieldName,fieldValue));
    }
}
