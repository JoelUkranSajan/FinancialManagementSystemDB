package com.eazybytes.accounts.service;

import com.eazybytes.accounts.dto.CustomerDto;

public interface IAccountsService {
    /**
    *
    * @param customerDto - CustomerDto object
    * */
    void createAccount(CustomerDto customerDto);
    /**
     * @param customerDto - CustomerDto Object
     * @return boolean indicating if the update of Account details is successfull or not
     * */
    boolean updateAccount(CustomerDto customerDto);

    /**
    * @param mobileNumber- Input Mobile Number
    * @return boolean indicating that account was deleted or not
    * */
    boolean deleteAccount(String mobileNumber);
}
