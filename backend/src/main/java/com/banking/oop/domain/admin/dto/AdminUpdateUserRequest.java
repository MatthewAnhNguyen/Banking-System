package com.banking.oop.domain.admin.dto;

import com.banking.oop.domain.user.entity.Role;
import com.banking.oop.domain.user.entity.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminUpdateUserRequest(
        @NotBlank @Size(min = 3, max = 80) String username,
        @NotBlank @Email @Size(max = 254) String email,
        @Size(min = 8, max = 72) String password,
        Role role,
        UserStatus status
) {
}