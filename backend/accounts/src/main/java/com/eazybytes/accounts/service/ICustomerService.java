package com.eazybytes.accounts.service;

import com.eazybytes.accounts.dto.CustomerDetailsDto;
import com.eazybytes.accounts.dto.CustomerDto;

import java.util.Optional;

public interface ICustomerService {
    Optional<CustomerDto> getCustomerByMobileNumber(String mobileNumber);
    CustomerDetailsDto fetchCustomerDetails(String mobileNumber, String correlationId);
}
