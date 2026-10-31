package com.banking.oop.domain.account.dto;

import com.banking.oop.domain.account.entity.AccountType;
import jakarta.validation.constraints.NotNull;

public record CreateAccountRequest(@NotNull AccountType accountType) {
}