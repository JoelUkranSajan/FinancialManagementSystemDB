package com.eazybytes.accounts.controller;

import com.eazybytes.accounts.dto.CustomerDetailsDto;
import com.eazybytes.accounts.dto.CustomerDto;
import com.eazybytes.accounts.service.ICustomerService;
import feign.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Rest Apis for customers in eazy bank",
description = "Rest Apis for Eazy bank to fetch customer")
@RestController
@RequestMapping(value = "/api", produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
public class CustomerController {
    private final ICustomerService iCustomerService;

    private final static Logger logger = LoggerFactory.getLogger(CustomerController.class);

    public CustomerController(ICustomerService iCustomerService){
        this.iCustomerService = iCustomerService;
    }



    @GetMapping("/fetchCustomerDetails")
    public ResponseEntity<CustomerDetailsDto> fetchCustomerDetails(
            @RequestHeader("eazybank-correlation-id") String correlationId,
            @RequestParam("mobileNumber")
            @Pattern(regexp = "($|[0-9]{10})", message = "Mobile Number must be of 10 digits") String mobileNumber){
        System.out.println("It hit");
        logger.debug("eazyBank-correlation-id found {}", correlationId);
        CustomerDetailsDto customerDetailsDto = iCustomerService.fetchCustomerDetails(mobileNumber, correlationId);
        return ResponseEntity.status(HttpStatus.OK).body(customerDetailsDto);
    }
}
