package com.banking.oop.domain.history.repository;

import com.banking.oop.domain.transaction.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HistoryRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findBySourceAccount_IdOrTargetAccount_IdOrderByTransactionDateDesc(
            Long sourceAccountId,
            Long targetAccountId,
            Pageable pageable
    );

    Optional<Transaction> findByIdAndSourceAccount_IdOrIdAndTargetAccount_Id(
            Long id1,
            Long sourceAccountId,
            Long id2,
            Long targetAccountId
    );
}