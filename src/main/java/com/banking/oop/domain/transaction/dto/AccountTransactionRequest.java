package com.banking.oop.domain.transaction.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record AccountTransactionRequest(
        @NotNull(message = "ID tài khoản không được để trống")
        Long accountId,

        @NotNull(message = "Số tiền không được để trống")
        @Positive(message = "Số tiền phải lớn hơn 0")
        BigDecimal amount
) {
}