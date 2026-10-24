package com.banking.oop.domain.transaction.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record TransferRequest(
        @NotNull(message = "ID tài khoản nguồn không được để trống")
        Long sourceAccountId,

        @NotNull(message = "ID tài khoản đích không được để trống")
        Long targetAccountId,

        @NotNull(message = "Số tiền không được để trống")
        @Positive(message = "Số tiền phải lớn hơn 0")
        BigDecimal amount
) {
}