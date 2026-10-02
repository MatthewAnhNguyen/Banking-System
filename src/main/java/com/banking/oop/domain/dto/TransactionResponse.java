package com.banking.oop.domain.dto;

import com.banking.oop.domain.enums.TransactionStatus;
import com.banking.oop.domain.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {

    private Long id;
    private TransactionType transactionType;
    private BigDecimal amount;
    private LocalDateTime transactionDate;
    private TransactionStatus status;
    private Long sourceAccountId;
    private Long targetAccountId;

}