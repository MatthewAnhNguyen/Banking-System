package com.banking.oop.domain.transaction.dto;

import com.banking.oop.domain.transaction.enums.TransactionStatus;
import com.banking.oop.domain.transaction.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionResponse(
        Long id,
        TransactionType transactionType,
        BigDecimal amount,
        LocalDateTime transactionDate,
        TransactionStatus status,
        String sourceAccountNumber,
        String targetAccountNumber
) {
}