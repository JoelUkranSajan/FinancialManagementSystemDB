package com.eazybytes.accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Schema(
        name = "Response",
        description = "Response structure of the API"
)
@Data
@AllArgsConstructor
public class ResponseDto {
    @Schema(description = "status code")
    private String statusCode;

    @Schema(description = "Response message")
    private String message;
}
