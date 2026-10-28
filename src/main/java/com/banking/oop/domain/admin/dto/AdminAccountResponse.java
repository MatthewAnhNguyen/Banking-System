package com.banking.oop.domain.admin.dto;

import com.banking.oop.domain.account.entity.AccountStatus;
import com.banking.oop.domain.account.entity.AccountType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AdminAccountResponse(
        Long id,
        String accountNumber,
        BigDecimal balance,
        AccountType accountType,
        AccountStatus status,
        LocalDateTime createdAt,
        Long userId,
        String username,
        String email
) {
}