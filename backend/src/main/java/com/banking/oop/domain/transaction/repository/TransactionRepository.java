package com.banking.oop.domain.transaction.repository;

import com.banking.oop.domain.transaction.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Modifying
    @Query("update Transaction t set t.sourceAccount = null where t.sourceAccount.id = :accountId")
    void clearSourceAccount(@Param("accountId") Long accountId);

    @Modifying
    @Query("update Transaction t set t.targetAccount = null where t.targetAccount.id = :accountId")
    void clearTargetAccount(@Param("accountId") Long accountId);
}