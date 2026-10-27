package com.banking.oop.domain.admin.config;

import com.banking.oop.domain.user.entity.Role;
import com.banking.oop.domain.user.entity.User;
import com.banking.oop.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.admin.bootstrap-enabled", havingValue = "true")
public class AdminBootstrapConfig {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String username;

    @Value("${app.admin.email}")
    private String email;

    @Value("${app.admin.password}")
    private String password;

    @Bean
    ApplicationRunner createInitialAdmin() {
        return args -> {
            if (username.isBlank() || email.isBlank() || password.isBlank()) {
                throw new IllegalStateException(
                        "ADMIN_USERNAME, ADMIN_EMAIL và ADMIN_PASSWORD phải được cấu hình"
                );
            }
            if (password.length() < 12) {
                throw new IllegalStateException("ADMIN_PASSWORD phải có ít nhất 12 ký tự");
            }

            String normalizedEmail = email.trim().toLowerCase();
            var existing = userRepository.findByEmailIgnoreCase(normalizedEmail);
            if (existing.isPresent()) {
                if (existing.get().getRole() != Role.ADMIN) {
                    throw new IllegalStateException(
                            "Admin email đã tồn tại dưới role USER; hãy cấu hình một email khác"
                    );
                }
                return;
            }
            if (userRepository.existsByUsernameIgnoreCase(username.trim())) {
                throw new IllegalStateException(
                        "Admin username đã được sử dụng; hãy cấu hình username khác"
                );
            }

            User admin = new User();
            admin.setUsername(username.trim());
            admin.setEmail(normalizedEmail);
            admin.setPassword(passwordEncoder.encode(password));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        };
    }
}
