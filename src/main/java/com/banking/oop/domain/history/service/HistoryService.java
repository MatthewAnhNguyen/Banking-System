package com.banking.oop.domain.history.service;

import com.banking.oop.domain.common.exception.ResourceNotFoundException;
import com.banking.oop.domain.history.dto.HistoryResponse;
import com.banking.oop.domain.history.port.CurrentUserAccountProvider;
import com.banking.oop.domain.history.repository.HistoryRepository;
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
    private final CurrentUserAccountProvider currentUserAccountProvider;

    @Transactional(readOnly = true)
    public Page<HistoryResponse> getCurrentUserHistory(int page, int size) {
        validatePage(page, size);

        Long accountId = currentUserAccountProvider.getCurrentUserAccountId();

        return historyRepository
                .findBySourceAccount_IdOrTargetAccount_IdOrderByTransactionDateDesc(
                        accountId,
                        accountId,
                        PageRequest.of(page, size)
                )
                .map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public HistoryResponse getCurrentUserTransaction(Long transactionId) {
        Long accountId = currentUserAccountProvider.getCurrentUserAccountId();

        Transaction transaction = historyRepository
                .findByIdAndSourceAccount_IdOrIdAndTargetAccount_Id(
                        transactionId,
                        accountId,
                        transactionId,
                        accountId
                )
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy giao dịch với ID: " + transactionId
                ));

        return toResponse(transaction);
    }

    private void validatePage(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new IllegalArgumentException(
                    "page phải >= 0 và size phải nằm trong khoảng 1 đến 100"
            );
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
                        ? null
                        : transaction.getSourceAccount().getId(),
                transaction.getTargetAccount() == null
                        ? null
                        : transaction.getTargetAccount().getId()
        );
    }
}