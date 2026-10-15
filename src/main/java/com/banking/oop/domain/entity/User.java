package com.banking.oop.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Tương ứng BIGINT AUTO_INCREMENT[cite: 3]

    @Column(nullable = false, unique = true, length = 100)
    private String username; // Tương ứng VARCHAR(100) UNIQUE[cite: 3]

    @Column(nullable = false, unique = true, length = 255)
    private String email; // Tương ứng VARCHAR(255) UNIQUE[cite: 3]

    @Column(nullable = false, length = 255)
    private String password; // Tương ứng VARCHAR(255)[cite: 3]

    @Column(nullable = false, length = 50)
    private String role; // Tương ứng VARCHAR(50)[cite: 3]

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt; // Tương ứng DATETIME DEFAULT CURRENT_TIMESTAMP[cite: 3]
}