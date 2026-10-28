package com.banking.oop.domain.user.service;

import com.banking.oop.domain.common.exception.BusinessRuleException;
import com.banking.oop.domain.user.dto.AuthResponse;
import com.banking.oop.domain.user.dto.LoginRequest;
import com.banking.oop.domain.user.dto.RegisterRequest;
import com.banking.oop.domain.user.entity.User;
import com.banking.oop.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final BankingUserDetailsService userDetailsService;
    private final JwtService jwtService;

    @Transactional
    public User register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        String username = request.username().trim();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new BusinessRuleException("Email đã được sử dụng");
        }
        if (userRepository.existsByUsernameIgnoreCase(username)) {
            throw new BusinessRuleException("Username đã được sử dụng");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));
        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.password())
        );

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new BusinessRuleException(
                        "Thông tin đăng nhập không hợp lệ"
                ));
        UserDetails details = userDetailsService.loadUserByUsername(email);

        return new AuthResponse(
                "Bearer",
                jwtService.generateToken(details),
                jwtService.getExpirationMs() / 1000,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}