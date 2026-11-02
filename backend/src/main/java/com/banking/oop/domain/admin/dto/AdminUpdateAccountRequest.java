package com.banking.oop.domain.admin.dto;

import com.banking.oop.domain.account.entity.AccountStatus;
import com.banking.oop.domain.account.entity.AccountType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record AdminUpdateAccountRequest(
        @NotNull AccountType accountType,
        @NotNull @PositiveOrZero BigDecimal balance,
        @NotNull AccountStatus status
) {
}