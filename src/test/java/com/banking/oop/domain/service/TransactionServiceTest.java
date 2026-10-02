package com.banking.oop.domain.service;

import com.banking.oop.domain.entity.Account;
import com.banking.oop.domain.Repository.AccountRepository;
import com.banking.oop.domain.entity.Transaction;
import com.banking.oop.domain.Repository.TransactionRepository;
import com.banking.oop.domain.dto.TransactionRequest;
import com.banking.oop.domain.dto.TransactionResponse;
import com.banking.oop.domain.enums.TransactionStatus;
import com.banking.oop.domain.enums.TransactionType;
import com.banking.oop.domain.exception.BusinessRuleException;
import com.banking.oop.domain.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private TransactionService transactionService;

    private Account sourceAccount;
    private Account targetAccount;
    private TransactionRequest validRequest;

    @BeforeEach
    void setUp() {
        sourceAccount = Account.builder().id(1L).balance(new BigDecimal("1000")).build();
        targetAccount = Account.builder().id(2L).balance(new BigDecimal("500")).build();

        validRequest = TransactionRequest.builder()
                .sourceAccountId(1L)
                .targetAccountId(2L)
                .amount(new BigDecimal("200"))
                .transactionType(TransactionType.TRANSFER)
                .build();
    }
    // Case 1: Transfer thành công
    @Test
    void transfer_Success() {
        when(accountRepository.findById(1L)).thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findById(2L)).thenReturn(Optional.of(targetAccount));

        Transaction mockSavedTransaction = Transaction.builder()
                .id(100L).transactionType(TransactionType.TRANSFER).amount(new BigDecimal("200"))
                .status(TransactionStatus.SUCCESS).sourceAccount(sourceAccount).targetAccount(targetAccount)
                .build();
        when(transactionRepository.save(any(Transaction.class))).thenReturn(mockSavedTransaction);
        TransactionResponse response = transactionService.transfer(validRequest);
        assertNotNull(response);
        assertEquals(new BigDecimal("800"), sourceAccount.getBalance());
        assertEquals(new BigDecimal("700"), targetAccount.getBalance());
        assertEquals(TransactionStatus.SUCCESS, response.getStatus());
        verify(accountRepository, times(1)).save(sourceAccount);
        verify(accountRepository, times(1)).save(targetAccount);
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }
    @Test
    void transfer_Fail_InsufficientBalance() {
        validRequest.setAmount(new BigDecimal("2000"));

        when(accountRepository.findById(1L)).thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findById(2L)).thenReturn(Optional.of(targetAccount));
        Exception exception = assertThrows(BusinessRuleException.class, () -> {
            transactionService.transfer(validRequest);
        });

        assertEquals("Số dư không đủ để thực hiện giao dịch.", exception.getMessage());
        verify(transactionRepository, never()).save(any());
    }
    @Test
    void transfer_Fail_SourceAccountNotFound() {
        when(accountRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            transactionService.transfer(validRequest);
        });
    }
    @Test
    void transfer_Fail_TargetAccountNotFound() {
        when(accountRepository.findById(1L)).thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            transactionService.transfer(validRequest);
        });
    }
    @Test
    void transfer_Fail_SameAccount() {
        validRequest.setTargetAccountId(1L);

        assertThrows(BusinessRuleException.class, () -> {
            transactionService.transfer(validRequest);
        });
        verify(accountRepository, never()).findById(any());
    }
    @Test
    void getTransactionById_Fail_NotFound() {
        when(transactionRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            transactionService.getTransactionById(99L);
        });
    }
    @Test
    void transfer_Fail_DatabaseError_ShouldRollback() {
        when(accountRepository.findById(1L)).thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findById(2L)).thenReturn(Optional.of(targetAccount));

        when(transactionRepository.save(any(Transaction.class))).thenThrow(new RuntimeException("Lỗi Database!"));
        assertThrows(RuntimeException.class, () -> {
            transactionService.transfer(validRequest);
        });
    }
}
