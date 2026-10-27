package com.banking.oop.domain.history.controller;

import com.banking.oop.domain.history.dto.HistoryResponse;
import com.banking.oop.domain.history.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {
    private final HistoryService historyService;

    @GetMapping
    public Page<HistoryResponse> getHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return historyService.getHistory(page, size);
    }

    @GetMapping("/{transactionId}")
    public HistoryResponse getTransaction(@PathVariable Long transactionId) {
        return historyService.getTransaction(transactionId);
    }
}