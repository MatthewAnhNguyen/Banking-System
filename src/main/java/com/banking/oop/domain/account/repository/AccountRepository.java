package com.banking.oop.domain.account.repository;

import com.banking.oop.domain.account.entity.Account;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findAllByUser_IdOrderByCreatedAtDesc(Long userId);
    Optional<Account> findByAccountNumber(String accountNumber);
    Optional<Account> findByAccountNumberAndUser_Id(String accountNumber, Long userId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select a from Account a where a.id = :id")
    Optional<Account> findByIdForUpdate(@Param("id") Long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select a from Account a where a.accountNumber = :number and a.user.id = :userId")
    Optional<Account> findByNumberAndUserForUpdate(
            @Param("number") String number,
            @Param("userId") Long userId
    );
}