package com.banking.oop.domain.admin.service;

import com.banking.oop.domain.account.entity.Account;
import com.banking.oop.domain.account.entity.AccountStatus;
import com.banking.oop.domain.account.repository.AccountRepository;
import com.banking.oop.domain.admin.dto.AdminAccountResponse;
import com.banking.oop.domain.admin.dto.AdminUserResponse;
import com.banking.oop.domain.common.exception.BusinessRuleException;
import com.banking.oop.domain.common.exception.ResourceNotFoundException;
import com.banking.oop.domain.user.entity.Role;
import com.banking.oop.domain.user.entity.UserStatus;
import com.banking.oop.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    @Transactional(readOnly = true)
    public Page<AdminUserResponse> getUsers(int page, int size) {
        return userRepository.findAll(pageRequest(page, size))
                .map(user -> new AdminUserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole(),
                        user.getStatus(),
                        user.getCreatedAt()
                ));
    }

    @Transactional
    public AdminUserResponse updateUserStatus(Long id, UserStatus status) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy người dùng với ID: " + id
                ));

        if (user.getRole() == Role.ADMIN) {
            throw new BusinessRuleException(
                    "Không thể thay đổi trạng thái tài khoản ADMIN"
            );
        }

        user.setStatus(status);
        userRepository.save(user);

        return new AdminUserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getStatus(),
                user.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public Page<AdminAccountResponse> getAccounts(int page, int size) {
        return accountRepository.findAll(pageRequest(page, size))
                .map(this::toResponse);
    }

    @Transactional
    public AdminAccountResponse updateAccountStatus(Long id, AccountStatus status) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy tài khoản với ID: " + id
                ));

        account.setStatus(status);
        return toResponse(accountRepository.save(account));
    }

    private PageRequest pageRequest(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new IllegalArgumentException(
                    "page phải >= 0 và size phải từ 1 đến 100"
            );
        }
        return PageRequest.of(page, size);
    }

    private AdminAccountResponse toResponse(Account account) {
        var owner = account.getUser();
        return new AdminAccountResponse(
                account.getId(),
                account.getAccountNumber(),
                account.getBalance(),
                account.getAccountType(),
                account.getStatus(),
                account.getCreatedAt(),
                owner.getId(),
                owner.getUsername(),
                owner.getEmail()
        );
    }
}