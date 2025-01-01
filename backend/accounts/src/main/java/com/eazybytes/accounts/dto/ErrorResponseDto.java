package com.eazybytes.accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ErrorResponseDto {
    @Schema(description = "API path hit by the user", example = "/created")
    private String apiPath;

    @Schema(description = "Error code", example = "404")
    private HttpStatus errorCode;

    @Schema(description = "Error message", example = "Resource not found")
    private String errorMessage;

    @Schema(description = "Timestamp of error occured", example = "27/01/2021 00:00:00")
    private LocalDateTime errorTime;
}
