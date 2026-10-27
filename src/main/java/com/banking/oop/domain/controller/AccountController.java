package com.banking.oop.domain.controller;

import com.banking.oop.domain.dto.AccountRequest;
import com.banking.oop.domain.dto.AccountResponse;
import com.banking.oop.domain.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/accounts")
    public ResponseEntity<AccountResponse> createAccount(
            @Valid @RequestBody AccountRequest request) {

        AccountResponse response = accountService.createAccount(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/accounts/{id}")
    public ResponseEntity<AccountResponse> getAccountById(
            @PathVariable Long id) {

        AccountResponse response =
                accountService.getAccountById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {

        List<AccountResponse> responses =
                accountService.getAllAccounts();

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/accounts/{id}/deposit")
    public ResponseEntity<AccountResponse> deposit(
            @PathVariable Long id,
            @RequestParam BigDecimal amount) {

        AccountResponse response =
                accountService.deposit(id, amount);

        return ResponseEntity.ok(response);
    }
}