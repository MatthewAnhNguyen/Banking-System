package com.banking.oop.domain.transaction.service;

import com.banking.oop.domain.account.entity.Account;
import com.banking.oop.domain.account.entity.AccountStatus;
import com.banking.oop.domain.account.repository.AccountRepository;
import com.banking.oop.domain.account.service.AccountService;
import com.banking.oop.domain.common.exception.BusinessRuleException;
import com.banking.oop.domain.common.exception.ResourceNotFoundException;
import com.banking.oop.domain.transaction.dto.AccountTransactionRequest;
import com.banking.oop.domain.transaction.dto.TransactionResponse;
import com.banking.oop.domain.transaction.dto.TransferRequest;
import com.banking.oop.domain.transaction.entity.Transaction;
import com.banking.oop.domain.transaction.enums.TransactionType;
import com.banking.oop.domain.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final TransactionRepository transactionRepository;

    @Transactional
    public TransactionResponse deposit(AccountTransactionRequest request) {
        Account target = ownedAccountForUpdate(request.accountNumber());
        ensureActive(target);
        target.setBalance(target.getBalance().add(request.amount()));
        return save(TransactionType.DEPOSIT, request.amount(), null, target);
    }

    @Transactional
    public TransactionResponse withdraw(AccountTransactionRequest request) {
        Account source = ownedAccountForUpdate(request.accountNumber());
        ensureActive(source);
        ensureSufficientBalance(source, request.amount());
        source.setBalance(source.getBalance().subtract(request.amount()));
        return save(TransactionType.WITHDRAWAL, request.amount(), source, null);
    }

    @Transactional
    public TransactionResponse transfer(TransferRequest request) {
        if (request.sourceAccountNumber().equals(request.targetAccountNumber())) {
            throw new BusinessRuleException("Tài khoản nguồn và đích không được trùng nhau");
        }

        Account sourceRef = accountRepository.findByAccountNumber(request.sourceAccountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản nguồn"));
        Account targetRef = accountRepository.findByAccountNumber(request.targetAccountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản đích"));

        Long firstId = Math.min(sourceRef.getId(), targetRef.getId());
        Long secondId = Math.max(sourceRef.getId(), targetRef.getId());
        Account first = lock(firstId);
        Account second = lock(secondId);

        Account source = first.getId().equals(sourceRef.getId()) ? first : second;
        Account target = first.getId().equals(targetRef.getId()) ? first : second;

        if (!source.getUser().getId().equals(accountService.currentUserId())) {
            throw new ResourceNotFoundException("Không tìm thấy tài khoản nguồn");
        }
        ensureActive(source);
        ensureActive(target);
        ensureSufficientBalance(source, request.amount());

        source.setBalance(source.getBalance().subtract(request.amount()));
        target.setBalance(target.getBalance().add(request.amount()));
        return save(TransactionType.TRANSFER, request.amount(), source, target);
    }

    private Account ownedAccountForUpdate(String accountNumber) {
        return accountRepository.findByNumberAndUserForUpdate(
                        accountNumber,
                        accountService.currentUserId()
                )
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản"));
    }

    private Account lock(Long id) {
        return accountRepository.findByIdForUpdate(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản"));
    }

    private void ensureActive(Account account) {
        if (account.getStatus() != AccountStatus.ACTIVE) {
            throw new BusinessRuleException("Tài khoản không hoạt động");
        }
    }

    private void ensureSufficientBalance(Account account, BigDecimal amount) {
        if (account.getBalance().compareTo(amount) < 0) {
            throw new BusinessRuleException("Số dư không đủ để thực hiện giao dịch");
        }
    }

    private TransactionResponse save(
            TransactionType type,
            BigDecimal amount,
            Account source,
            Account target
    ) {
        Transaction transaction = new Transaction();
        transaction.setTransactionType(type);
        transaction.setAmount(amount);
        transaction.setSourceAccount(source);
        transaction.setTargetAccount(target);
        return toResponse(transactionRepository.save(transaction));
    }

    private TransactionResponse toResponse(Transaction transaction) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getTransactionType(),
                transaction.getAmount(),
                transaction.getTransactionDate(),
                transaction.getStatus(),
                transaction.getSourceAccount() == null
                        ? null : transaction.getSourceAccount().getAccountNumber(),
                transaction.getTargetAccount() == null
                        ? null : transaction.getTargetAccount().getAccountNumber()
        );
    }
}