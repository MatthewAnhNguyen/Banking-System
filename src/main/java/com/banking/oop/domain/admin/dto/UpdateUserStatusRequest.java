package com.banking.oop.domain.admin.dto;

import com.banking.oop.domain.user.entity.UserStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateUserStatusRequest(@NotNull UserStatus status) {
}