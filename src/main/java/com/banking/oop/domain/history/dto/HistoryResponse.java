package com.banking.oop.domain.history.dto;

import com.banking.oop.domain.transaction.enums.TransactionStatus;
import com.banking.oop.domain.transaction.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record HistoryResponse(
        Long id,
        TransactionType transactionType,
        BigDecimal amount,
        LocalDateTime transactionDate,
        TransactionStatus status,
        Long sourceAccountId,
        Long targetAccountId
) {
}