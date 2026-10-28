package com.banking.oop.domain.transaction.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record AccountTransactionRequest(
        @NotBlank String accountNumber,
        @NotNull @Positive BigDecimal amount
) {
}