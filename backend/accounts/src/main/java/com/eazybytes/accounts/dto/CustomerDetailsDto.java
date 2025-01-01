package com.eazybytes.accounts.dto;

import com.eazybytes.loans.dto.LoansDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(
        name="Customer",
        description = "Schema to hold Customer, Account, Cards and Loans Information"
)
public class CustomerDetailsDto {
    @Schema(description = "Name of the customer",example = "Yahoo")
    @NotEmpty(message = "Name cannot be empty")
    @Size(min = 5, max = 30, message = "The length of the customer name should be between 5 and 30")
    private String name;

    @Schema(description = "Email of the customer",example = "ac@gmail.com")
    @NotEmpty(message = "Email address cannot be empty")
    @Email(message = "Email address should be a valid value")
    private String email;

    @Schema(description = "Mobile Number of the customer",example = "8975987068")
    @Pattern(regexp = "($|[0-9]{10})", message = "Mobile number must be of 10 digits")
    private String mobileNumber;

    @Schema(description = "Account Details of the customer")
    private AccountsDto accountsDto;

    @Schema(description = "Loans Details of the customer")
    private LoansDto loansDto;

    @Schema(description = "Cards Details of the customer")
    private CardsDto cardsDto;
}
