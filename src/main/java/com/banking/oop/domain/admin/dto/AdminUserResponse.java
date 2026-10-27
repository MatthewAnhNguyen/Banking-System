package com.banking.oop.domain.admin.dto;

import com.banking.oop.domain.user.entity.Role;
import com.banking.oop.domain.user.entity.UserStatus;

import java.time.LocalDateTime;

public record AdminUserResponse(
        Long id,
        String username,
        String email,
        Role role,
        UserStatus status,
        LocalDateTime createdAt
) {
}