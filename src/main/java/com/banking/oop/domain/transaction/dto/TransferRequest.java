package com.banking.oop.domain.transaction.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record TransferRequest(
        @NotBlank String sourceAccountNumber,
        @NotBlank String targetAccountNumber,
        @NotNull @Positive BigDecimal amount
) {
}