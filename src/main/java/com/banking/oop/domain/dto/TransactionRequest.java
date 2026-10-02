package com.banking.oop.domain.dto;

import com.banking.oop.domain.enums.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {

    @NotNull(message = "Loại giao dịch không được để trống")
    private TransactionType transactionType;

    @NotNull(message = "Số tiền không được để trống")
    @Positive(message = "Số tiền giao dịch phải lớn hơn 0")
    private BigDecimal amount;

    // Tùy theo logic (nạp tiền thì ko cần source), nhưng với chuyển khoản thì bắt buộc
    @NotNull(message = "ID tài khoản nguồn không được để trống")
    private Long sourceAccountId;

    @NotNull(message = "ID tài khoản đích không được để trống")
    private Long targetAccountId;
}