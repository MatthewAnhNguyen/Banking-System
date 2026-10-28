package com.banking.oop.domain.account.service;

import com.banking.oop.domain.account.dto.AccountResponse;
import com.banking.oop.domain.account.dto.CreateAccountRequest;
import com.banking.oop.domain.account.entity.Account;
import com.banking.oop.domain.account.repository.AccountRepository;
import com.banking.oop.domain.common.exception.ResourceNotFoundException;
import com.banking.oop.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final SecureRandom random = new SecureRandom();

    @Transactional
    public AccountResponse create(CreateAccountRequest request) {
        String email = currentEmail();
        var user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));

        Account account = new Account();
        account.setUser(user);
        account.setAccountType(request.accountType());
        account.setBalance(BigDecimal.ZERO);
        account.setAccountNumber(generateAccountNumber());
        return toResponse(accountRepository.save(account));
    }

    @Transactional(readOnly = true)
    public List<AccountResponse> getMyAccounts() {
        var user = userRepository.findByEmailIgnoreCase(currentEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));
        return accountRepository.findAllByUser_IdOrderByCreatedAtDesc(user.getId())
                .stream().map(this::toResponse).toList();
    }

    public Long currentUserId() {
        var user = userRepository.findByEmailIgnoreCase(currentEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng"));
        return user.getId();
    }

    private String currentEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private String generateAccountNumber() {
        for (int i = 0; i < 10; i++) {
            String number = String.format("%012d", Math.abs(random.nextLong() % 1_000_000_000_000L));
            if (accountRepository.findByAccountNumber(number).isEmpty()) {
                return number;
            }
        }
        throw new IllegalStateException("Không thể tạo số tài khoản, vui lòng thử lại");
    }

    private AccountResponse toResponse(Account account) {
        return new AccountResponse(
                account.getId(),
                account.getAccountNumber(),
                account.getBalance(),
                account.getAccountType(),
                account.getStatus(),
                account.getCreatedAt()
        );
    }
}