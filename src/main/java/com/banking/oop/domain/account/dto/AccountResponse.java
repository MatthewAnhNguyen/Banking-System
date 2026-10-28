package com.banking.oop.domain.account.dto;

import com.banking.oop.domain.account.entity.AccountStatus;
import com.banking.oop.domain.account.entity.AccountType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AccountResponse(
        Long id,
        String accountNumber,
        BigDecimal balance,
        AccountType accountType,
        AccountStatus status,
        LocalDateTime createdAt
) {
}