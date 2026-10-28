package com.banking.oop.domain.admin.controller;

import com.banking.oop.domain.account.entity.AccountStatus;
import com.banking.oop.domain.admin.dto.AdminAccountResponse;
import com.banking.oop.domain.admin.dto.AdminUserResponse;
import com.banking.oop.domain.admin.dto.UpdateAccountStatusRequest;
import com.banking.oop.domain.admin.dto.UpdateUserStatusRequest;
import com.banking.oop.domain.user.entity.UserStatus;
import com.banking.oop.domain.admin.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/users")
    public Page<AdminUserResponse> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return adminService.getUsers(page, size);
    }

    @PatchMapping("/users/{id}/status")
    public AdminUserResponse updateUserStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserStatusRequest request
    ) {
        return adminService.updateUserStatus(id, request.status());
    }

    @GetMapping("/accounts")
    public Page<AdminAccountResponse> getAccounts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return adminService.getAccounts(page, size);
    }

    @PatchMapping("/accounts/{id}/status")
    public AdminAccountResponse updateAccountStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAccountStatusRequest request
    ) {
        return adminService.updateAccountStatus(id, request.status());
    }
}
