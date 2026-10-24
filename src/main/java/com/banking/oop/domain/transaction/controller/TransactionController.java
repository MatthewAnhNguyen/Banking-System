package com.banking.oop.domain.transaction.controller;

import com.banking.oop.domain.transaction.dto.AccountTransactionRequest;
import com.banking.oop.domain.transaction.dto.TransactionResponse;
import com.banking.oop.domain.transaction.dto.TransferRequest;
import com.banking.oop.domain.transaction.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/deposit")
    public ResponseEntity<TransactionResponse> deposit(
            @Valid @RequestBody AccountTransactionRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transactionService.deposit(request));
    }

    @PostMapping("/withdraw")
    public ResponseEntity<TransactionResponse> withdraw(
            @Valid @RequestBody AccountTransactionRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transactionService.withdraw(request));
    }

    @PostMapping("/transfer")
    public ResponseEntity<TransactionResponse> transfer(
            @Valid @RequestBody TransferRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transactionService.transfer(request));
    }
}