package com.banking.oop.domain.history.repository;

import com.banking.oop.domain.transaction.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface HistoryRepository extends JpaRepository<Transaction, Long> {
    @Query("""
            select t from Transaction t
            left join t.sourceAccount source
            left join t.targetAccount target
            where source.user.id = :userId or target.user.id = :userId
            order by t.transactionDate desc
            """)
    Page<Transaction> findHistoryByUserId(
            @Param("userId") Long userId,
            Pageable pageable
    );

    @Query("""
            select t from Transaction t
            left join t.sourceAccount source
            left join t.targetAccount target
            where t.id = :transactionId
              and (source.user.id = :userId or target.user.id = :userId)
            """)
    Optional<Transaction> findUserTransaction(
            @Param("transactionId") Long transactionId,
            @Param("userId") Long userId
    );
}