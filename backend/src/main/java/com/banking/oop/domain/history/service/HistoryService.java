package com.banking.oop.domain.history.service;

import com.banking.oop.domain.common.exception.ResourceNotFoundException;
import com.banking.oop.domain.history.dto.HistoryResponse;
import com.banking.oop.domain.history.repository.HistoryRepository;
import com.banking.oop.domain.account.service.AccountService;
import com.banking.oop.domain.transaction.entity.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final AccountService accountService;

    @Transactional(readOnly = true)
    public Page<HistoryResponse> getHistory(int page, int size) {
        validatePage(page, size);
        return historyRepository.findHistoryByUserId(
                        accountService.currentUserId(),
                        PageRequest.of(page, size)
                )
                .map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public HistoryResponse getTransaction(Long transactionId) {
        Transaction transaction = historyRepository.findUserTransaction(
                        transactionId,
                        accountService.currentUserId()
                )
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy giao dịch với ID: " + transactionId
                ));
        return toResponse(transaction);
    }

    private void validatePage(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new IllegalArgumentException("page phải >= 0 và size phải từ 1 đến 100");
        }
    }

    private HistoryResponse toResponse(Transaction transaction) {
        return new HistoryResponse(
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