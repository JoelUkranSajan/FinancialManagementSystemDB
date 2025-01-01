package com.eazybytes.accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Schema(
        name="Customer",
        description = "Schema to hold Customer and Account Information"
)
public class CustomerDto {
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

    private AccountsDto accountsDto;
}
