package com.banking.oop.domain.dto;

import lombok.Data;
import java.time.LocalDateTime;

// Request khi đăng ký
@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String role;
}