package com.banking.oop.domain.service;

import com.banking.oop.domain.Repository.AccountRepository;
import com.banking.oop.domain.dto.AccountRequest;
import com.banking.oop.domain.dto.AccountResponse;
import com.banking.oop.domain.entity.Account;
import com.banking.oop.domain.exception.BusinessRuleException;
import com.banking.oop.domain.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountResponse createAccount(AccountRequest request) {

        Account account = Account.builder()
                .balance(request.getBalance())
                .build();

        Account savedAccount = accountRepository.save(account);

        return mapToResponse(savedAccount);
    }

    public AccountResponse getAccountById(Long id) {

        Account account = accountRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Không tìm thấy tài khoản với ID: " + id
                        ));

        return mapToResponse(account);
    }

    public List<AccountResponse> getAllAccounts() {

        return accountRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AccountResponse deposit(Long id, BigDecimal amount) {

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessRuleException(
                    "Số tiền nạp phải lớn hơn 0"
            );
        }

        Account account = accountRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Không tìm thấy tài khoản với ID: " + id
                        ));

        account.setBalance(
                account.getBalance().add(amount)
        );

        Account savedAccount = accountRepository.save(account);

        return mapToResponse(savedAccount);
    }

    private AccountResponse mapToResponse(Account account) {

        return AccountResponse.builder()
                .id(account.getId())
                .balance(account.getBalance())
                .build();
    }
}