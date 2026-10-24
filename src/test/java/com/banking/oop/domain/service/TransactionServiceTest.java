package com.banking.oop.domain.service;

import com.banking.oop.domain.account.entity.Account;
import com.banking.oop.domain.account.repository.AccountRepository;
import com.banking.oop.domain.common.exception.BusinessRuleException;
import com.banking.oop.domain.common.exception.ResourceNotFoundException;
import com.banking.oop.domain.transaction.dto.TransactionResponse;
import com.banking.oop.domain.transaction.dto.TransferRequest;
import com.banking.oop.domain.transaction.entity.Transaction;
import com.banking.oop.domain.transaction.enums.TransactionStatus;
import com.banking.oop.domain.transaction.enums.TransactionType;
import com.banking.oop.domain.transaction.repository.TransactionRepository;
import com.banking.oop.domain.transaction.service.TransactionService;

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
    private TransferRequest validRequest;

    @BeforeEach
    void setUp() {
        sourceAccount = Account.builder()
                .id(1L)
                .balance(new BigDecimal("1000.00"))
                .build();

        targetAccount = Account.builder()
                .id(2L)
                .balance(new BigDecimal("500.00"))
                .build();

        validRequest = new TransferRequest(
                1L,
                2L,
                new BigDecimal("200.00")
        );
    }

    @Test
    void transfer_success() {
        when(accountRepository.findByIdForUpdate(1L))
                .thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findByIdForUpdate(2L))
                .thenReturn(Optional.of(targetAccount));
        when(transactionRepository.save(any(Transaction.class)))
                .thenAnswer(invocation -> {
                    Transaction transaction = invocation.getArgument(0);
                    transaction.setId(100L);
                    return transaction;
                });

        TransactionResponse response = transactionService.transfer(validRequest);

        assertEquals(100L, response.id());
        assertEquals(TransactionType.TRANSFER, response.transactionType());
        assertEquals(TransactionStatus.SUCCESS, response.status());
        assertEquals(new BigDecimal("800.00"), sourceAccount.getBalance());
        assertEquals(new BigDecimal("700.00"), targetAccount.getBalance());

        verify(accountRepository).save(sourceAccount);
        verify(accountRepository).save(targetAccount);
        verify(transactionRepository).save(any(Transaction.class));
    }

    @Test
    void transfer_failsWhenBalanceIsInsufficient() {
        TransferRequest request = new TransferRequest(
                1L,
                2L,
                new BigDecimal("2000.00")
        );

        when(accountRepository.findByIdForUpdate(1L))
                .thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findByIdForUpdate(2L))
                .thenReturn(Optional.of(targetAccount));

        BusinessRuleException exception = assertThrows(
                BusinessRuleException.class,
                () -> transactionService.transfer(request)
        );

        assertEquals("Số dư không đủ để thực hiện giao dịch", exception.getMessage());
        verify(transactionRepository, never()).save(any());
    }

    @Test
    void transfer_failsWhenSourceAccountDoesNotExist() {
        when(accountRepository.findByIdForUpdate(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> transactionService.transfer(validRequest)
        );

        verify(accountRepository, never()).save(any());
        verify(transactionRepository, never()).save(any());
    }

    @Test
    void transfer_failsWhenTargetAccountDoesNotExist() {
        when(accountRepository.findByIdForUpdate(1L))
                .thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findByIdForUpdate(2L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> transactionService.transfer(validRequest)
        );

        verify(accountRepository, never()).save(any());
        verify(transactionRepository, never()).save(any());
    }

    @Test
    void transfer_failsWhenSourceAndTargetAreTheSameAccount() {
        TransferRequest request = new TransferRequest(
                1L,
                1L,
                new BigDecimal("200.00")
        );

        assertThrows(
                BusinessRuleException.class,
                () -> transactionService.transfer(request)
        );

        verify(accountRepository, never()).findByIdForUpdate(any());
        verify(transactionRepository, never()).save(any());
    }

    @Test
    void transfer_failsWhenSavingTransactionThrows() {
        when(accountRepository.findByIdForUpdate(1L))
                .thenReturn(Optional.of(sourceAccount));
        when(accountRepository.findByIdForUpdate(2L))
                .thenReturn(Optional.of(targetAccount));
        when(transactionRepository.save(any(Transaction.class)))
                .thenThrow(new RuntimeException("Lỗi Database!"));

        assertThrows(
                RuntimeException.class,
                () -> transactionService.transfer(validRequest)
        );
    }
}