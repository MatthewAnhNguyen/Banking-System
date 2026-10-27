package com.banking.oop.domain.user.dto;

public record AuthResponse(
        String tokenType,
        String accessToken,
        long expiresInSeconds,
        Long userId,
        String username,
        String email,
        String role
) {
}