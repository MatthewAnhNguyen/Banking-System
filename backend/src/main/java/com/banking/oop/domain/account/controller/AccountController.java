package com.banking.oop.domain.account.controller;

import com.banking.oop.domain.account.dto.AccountResponse;
import com.banking.oop.domain.account.dto.CreateAccountRequest;
import com.banking.oop.domain.account.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AccountResponse create(@Valid @RequestBody CreateAccountRequest request) {
        return accountService.create(request);
    }

    @GetMapping("/me")
    public List<AccountResponse> getMyAccounts() {
        return accountService.getMyAccounts();
    }
}