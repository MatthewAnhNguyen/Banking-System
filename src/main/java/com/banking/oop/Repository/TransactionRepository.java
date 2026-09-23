package com.banking.oop.Repository;

import com.banking.oop.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySourceAccountId(Long id);
    List<Transaction> findByTargetAccountId(Long id);

    @Query("Select t from Transaction t WHERE t.sourceAccount.id = :accountId OR t.targetAccount.id = :accountId")
    List<Transaction> findAllTransactionsByAccountId(@Param("accountId")Long accountId);
}
