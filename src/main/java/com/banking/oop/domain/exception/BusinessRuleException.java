package com.banking.oop.domain.exception;

public class BusinessRuleException extends RuntimeException{
    //Vi phạm các nguyên tắc ngân hàng
    public BusinessRuleException(String message){
        super(message);
    }
}
