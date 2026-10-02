package com.banking.oop.domain.service;

import com.banking.oop.domain.Repository.AccountRepository;
import com.banking.oop.domain.Repository.TransactionRepository;
import com.banking.oop.domain.entity.Transaction;
import com.banking.oop.domain.entity.Account;
import com.banking.oop.domain.dto.TransactionRequest;
import com.banking.oop.domain.dto.TransactionResponse;
import com.banking.oop.domain.enums.TransactionStatus;
import com.banking.oop.domain.enums.TransactionType;
import com.banking.oop.domain.exception.BusinessRuleException;
import com.banking.oop.domain.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    @Transactional(rollbackFor = Exception.class)
    public TransactionResponse transfer(TransactionRequest request) {
        if (request.getSourceAccountId().equals(request.getTargetAccountId())) {
            throw new BusinessRuleException("Tài khoản nguồn và đích không được trùng nhau");
        }
        Account sourceAccount = accountRepository.findById(request.getSourceAccountId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản nguồn với ID: " + request.getSourceAccountId()));

        Account targetAccount = accountRepository.findById(request.getTargetAccountId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản đích với ID: " + request.getTargetAccountId()));
        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessRuleException("Số tiền giao dịch phải lớn hơn 0");
        }
        if (sourceAccount.getBalance().compareTo(request.getAmount()) < 0) {
            throw new BusinessRuleException("Số dư không đủ để thực hiện giao dịch");
        }
        sourceAccount.setBalance(sourceAccount.getBalance().subtract(request.getAmount()));
        targetAccount.setBalance(targetAccount.getBalance().add(request.getAmount()));
        accountRepository.save(sourceAccount);
        accountRepository.save(targetAccount);
        Transaction transaction = Transaction.builder()
                .transactionType(TransactionType.TRANSFER)
                .amount(request.getAmount())
                .status(TransactionStatus.SUCCESS)
                .sourceAccount(sourceAccount)
                .targetAccount(targetAccount)
                .build();
        Transaction savedTransaction = transactionRepository.save(transaction);
        return mapToResponse(savedTransaction);
    }
    private TransactionResponse mapToResponse(Transaction transaction) {
        return TransactionResponse.builder()
                .id(transaction.getId())
                .transactionType(transaction.getTransactionType())
                .amount(transaction.getAmount())
                .transactionDate(transaction.getTransactionDate())
                .status(transaction.getStatus())
                .sourceAccountId(transaction.getSourceAccount().getId())
                .targetAccountId(transaction.getTargetAccount().getId())
                .build();
    }
    public TransactionResponse getTransactionById(Long id){
        Transaction transaction = transactionRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Không tìm thấy giao dịch với ID: " + id));
        return mapToResponse(transaction);
    }
    public List<TransactionResponse> getAllTransactions(){
        return transactionRepository.findAll().stream().
                map(this::mapToResponse).collect(Collectors.toList());
    }
    public List<TransactionResponse> getTransactionsByAccountId(Long accountId){
        return transactionRepository.findAllTransactionsByAccountId(accountId).
                stream().map(this::mapToResponse).collect(Collectors.toList());
    }
}