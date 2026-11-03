package com.banking.oop.domain.admin.service;

import com.banking.oop.domain.account.entity.Account;
import com.banking.oop.domain.account.entity.AccountStatus;
import com.banking.oop.domain.account.repository.AccountRepository;
import com.banking.oop.domain.admin.dto.*;
import com.banking.oop.domain.common.exception.BusinessRuleException;
import com.banking.oop.domain.common.exception.ResourceNotFoundException;
import com.banking.oop.domain.transaction.repository.TransactionRepository;
import com.banking.oop.domain.user.entity.Role;
import com.banking.oop.domain.user.entity.User;
import com.banking.oop.domain.user.entity.UserStatus;
import com.banking.oop.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom random = new SecureRandom();

    @Transactional(readOnly = true)
    public Page<AdminUserResponse> getUsers(int page, int size) {
        return userRepository.findAll(pageRequest(page, size))
                .map(this::toUserResponse);
    }

    @Transactional
    public AdminUserResponse createUser(AdminCreateUserRequest request) {
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
        user.setRole(request.role() != null ? request.role() : Role.USER);
        user.setStatus(request.status() != null ? request.status() : UserStatus.ACTIVE);

        return toUserResponse(userRepository.save(user));
    }

    @Transactional
    public AdminUserResponse updateUser(Long id, AdminUpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + id));

        String email = request.email().trim().toLowerCase();
        String username = request.username().trim();

        if (!user.getEmail().equalsIgnoreCase(email) && userRepository.existsByEmailIgnoreCase(email)) {
            throw new BusinessRuleException("Email đã được sử dụng bởi người dùng khác");
        }
        if (!user.getUsername().equalsIgnoreCase(username) && userRepository.existsByUsernameIgnoreCase(username)) {
            throw new BusinessRuleException("Username đã được sử dụng bởi người dùng khác");
        }

        if (user.getRole() == Role.ADMIN && request.status() == UserStatus.DISABLED) {
            throw new BusinessRuleException("Không thể vô hiệu hóa tài khoản ADMIN");
        }

        user.setUsername(username);
        user.setEmail(email);
        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }
        if (request.role() != null) {
            user.setRole(request.role());
        }
        if (request.status() != null) {
            user.setStatus(request.status());
        }

        return toUserResponse(userRepository.save(user));
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
        return toUserResponse(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + id));

        if (user.getRole() == Role.ADMIN) {
            throw new BusinessRuleException("Không thể xóa tài khoản ADMIN");
        }

        List<Account> userAccounts = accountRepository.findAllByUser_IdOrderByCreatedAtDesc(id);
        for (Account account : userAccounts) {
            transactionRepository.clearSourceAccount(account.getId());
            transactionRepository.clearTargetAccount(account.getId());
            accountRepository.delete(account);
        }

        userRepository.delete(user);
    }

    @Transactional(readOnly = true)
    public Page<AdminAccountResponse> getAccounts(int page, int size) {
        return accountRepository.findAll(pageRequest(page, size))
                .map(this::toAccountResponse);
    }

    @Transactional
    public AdminAccountResponse createAccount(AdminCreateAccountRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + request.userId()));

        Account account = new Account();
        account.setUser(user);
        account.setAccountType(request.accountType());
        account.setBalance(request.balance() != null ? request.balance() : BigDecimal.ZERO);
        account.setStatus(request.status() != null ? request.status() : AccountStatus.ACTIVE);
        account.setAccountNumber(generateAccountNumber());

        return toAccountResponse(accountRepository.save(account));
    }

    @Transactional
    public AdminAccountResponse updateAccount(Long id, AdminUpdateAccountRequest request) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản với ID: " + id));

        account.setAccountType(request.accountType());
        account.setBalance(request.balance());
        account.setStatus(request.status());

        return toAccountResponse(accountRepository.save(account));
    }

    @Transactional
    public AdminAccountResponse updateAccountStatus(Long id, AccountStatus status) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy tài khoản với ID: " + id
                ));
        account.setStatus(status);
        return toAccountResponse(accountRepository.save(account));
    }

    @Transactional
    public void deleteAccount(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản với ID: " + id));

        transactionRepository.clearSourceAccount(account.getId());
        transactionRepository.clearTargetAccount(account.getId());
        accountRepository.delete(account);
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

    private PageRequest pageRequest(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new IllegalArgumentException(
                    "page phải >= 0 và size phải từ 1 đến 100"
            );
        }
        return PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    private AdminUserResponse toUserResponse(User user) {
        return new AdminUserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getStatus(),
                user.getCreatedAt()
        );
    }

    private AdminAccountResponse toAccountResponse(Account account) {
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