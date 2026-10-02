package com.banking.oop.domain.controller;

import com.banking.oop.domain.dto.TransactionRequest;
import com.banking.oop.domain.dto.TransactionResponse;
import com.banking.oop.domain.enums.TransactionType;
import com.banking.oop.domain.service.TransactionService;
import tools.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TransactionController.class) // Chỉ load môi trường Web Controller để test cho nhanh
class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TransactionService transactionService; // Giả lập Service vì ta chỉ muốn test Controller

    // Test API tạo giao dịch thành công
    @Test
    void createTransaction_Success() throws Exception {
        TransactionRequest request = TransactionRequest.builder()
                .sourceAccountId(1L)
                .targetAccountId(2L)
                .amount(new BigDecimal("200"))
                .transactionType(TransactionType.TRANSFER)
                .build();

        TransactionResponse response = TransactionResponse.builder()
                .id(10L)
                .amount(new BigDecimal("200"))
                .build();

        when(transactionService.transfer(any(TransactionRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/transactions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated()) // Mong đợi mã 201 Created
                .andExpect(jsonPath("$.id").value(10L))
                .andExpect(jsonPath("$.amount").value(200));
    }

    // Case 6: Amount <= 0 (Kiểm tra Validation DTO)
    @Test
    void createTransaction_Fail_ValidationAmountZero() throws Exception {
        TransactionRequest request = TransactionRequest.builder()
                .sourceAccountId(1L)
                .targetAccountId(2L)
                .amount(new BigDecimal("-50")) // Gửi số âm để test @Positive
                .transactionType(TransactionType.TRANSFER)
                .build();

        mockMvc.perform(post("/api/transactions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest()) // Mong đợi mã 400 Bad Request
                .andExpect(jsonPath("$.amount").value("Số tiền giao dịch phải lớn hơn 0")); // Lỗi trả về từ GlobalExceptionHandler
    }
}