package com.eazybytes.accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Schema(
        name = "Accounts",
        description = "Schema to hold customer account information"
)
@Data
public class AccountsDto {

    @Schema(description = "Account number of the customer", example = "7894561230")
    @NotEmpty(message = "Account Number cannot be Empty")
    @Pattern(regexp = "($|[0-9]{10})", message = "Account Number must be of 10 digits")
    private Long accountNumber;

    @Schema(description = "Account type of the customer", example = "Saving/Current")
    @NotEmpty(message = "Account Type cannot be Empty")
    private String accountType;

    @Schema(description = "Branch Address of the customer", example = "Burudgaon Road, Ahmednagar")
    @NotEmpty(message = "Branch Address cannot be null or Empty")
    private String branchAddress;
}
