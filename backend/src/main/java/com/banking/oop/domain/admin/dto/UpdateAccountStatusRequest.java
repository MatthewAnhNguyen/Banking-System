package com.banking.oop.domain.admin.dto;

import com.banking.oop.domain.account.entity.AccountStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateAccountStatusRequest(@NotNull AccountStatus status) {
}