package com.banking.oop.domain.transaction.service;

import com.banking.oop.domain.account.entity.Account;
import com.banking.oop.domain.account.repository.AccountRepository;
import com.banking.oop.domain.common.exception.BusinessRuleException;
import com.banking.oop.domain.common.exception.ResourceNotFoundException;
import com.banking.oop.domain.transaction.dto.AccountTransactionRequest;
import com.banking.oop.domain.transaction.dto.TransactionResponse;
import com.banking.oop.domain.transaction.dto.TransferRequest;
import com.banking.oop.domain.transaction.entity.Transaction;
import com.banking.oop.domain.transaction.enums.TransactionStatus;
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
    private final TransactionRepository transactionRepository;

    @Transactional(rollbackFor = Exception.class)
    public TransactionResponse deposit(AccountTransactionRequest request) {
        validateAmount(request.amount());

        Account target = getAccountForUpdate(request.accountId());
        target.setBalance(balanceOf(target).add(request.amount()));
        accountRepository.save(target);

        return saveTransaction(
                TransactionType.DEPOSIT,
                request.amount(),
                null,
                target
        );
    }

    @Transactional(rollbackFor = Exception.class)
    public TransactionResponse withdraw(AccountTransactionRequest request) {
        validateAmount(request.amount());

        Account source = getAccountForUpdate(request.accountId());
        BigDecimal balance = balanceOf(source);

        if (balance.compareTo(request.amount()) < 0) {
            throw new BusinessRuleException("Số dư không đủ để thực hiện giao dịch");
        }

        source.setBalance(balance.subtract(request.amount()));
        accountRepository.save(source);

        return saveTransaction(
                TransactionType.WITHDRAWAL,
                request.amount(),
                source,
                null
        );
    }

    @Transactional(rollbackFor = Exception.class)
    public TransactionResponse transfer(TransferRequest request) {
        validateAmount(request.amount());

        if (request.sourceAccountId().equals(request.targetAccountId())) {
            throw new BusinessRuleException(
                    "Tài khoản nguồn và đích không được trùng nhau"
            );
        }

        // Khóa theo ID tăng dần để giảm nguy cơ deadlock khi chuyển tiền hai chiều.
        Long firstId = Math.min(request.sourceAccountId(), request.targetAccountId());
        Long secondId = Math.max(request.sourceAccountId(), request.targetAccountId());

        Account first = getAccountForUpdate(firstId);
        Account second = getAccountForUpdate(secondId);

        Account source = first.getId().equals(request.sourceAccountId()) ? first : second;
        Account target = first.getId().equals(request.targetAccountId()) ? first : second;

        BigDecimal sourceBalance = balanceOf(source);
        if (sourceBalance.compareTo(request.amount()) < 0) {
            throw new BusinessRuleException("Số dư không đủ để thực hiện giao dịch");
        }

        source.setBalance(sourceBalance.subtract(request.amount()));
        target.setBalance(balanceOf(target).add(request.amount()));

        accountRepository.save(source);
        accountRepository.save(target);

        return saveTransaction(
                TransactionType.TRANSFER,
                request.amount(),
                source,
                target
        );
    }

    private Account getAccountForUpdate(Long accountId) {
        return accountRepository.findByIdForUpdate(accountId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy tài khoản với ID: " + accountId
                ));
    }

    private void validateAmount(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessRuleException("Số tiền giao dịch phải lớn hơn 0");
        }
    }

    private BigDecimal balanceOf(Account account) {
        return account.getBalance() == null ? BigDecimal.ZERO : account.getBalance();
    }

    private TransactionResponse saveTransaction(
            TransactionType type,
            BigDecimal amount,
            Account source,
            Account target
    ) {
        Transaction transaction = Transaction.builder()
                .transactionType(type)
                .amount(amount)
                .status(TransactionStatus.SUCCESS)
                .sourceAccount(source)
                .targetAccount(target)
                .build();

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
                        ? null
                        : transaction.getSourceAccount().getId(),
                transaction.getTargetAccount() == null
                        ? null
                        : transaction.getTargetAccount().getId()
        );
    }
}