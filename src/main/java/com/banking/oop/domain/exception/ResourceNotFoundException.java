package com.banking.oop.domain.exception;

public class ResourceNotFoundException extends RuntimeException{
    // Dữ liệu/Giao dịch không tồn tại
    public ResourceNotFoundException(String message){
        super(message);
    }
}
