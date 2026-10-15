package com.banking.oop.domain.dto;

import lombok.Data;
import java.time.LocalDateTime;
// Response trả về thông tin User (ẩn password)
@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String role;
    private LocalDateTime createdAt;
}