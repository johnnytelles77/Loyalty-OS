package com.loyalty.dtos;

import lombok.Data;

@Data
public class NotificationDTO {
    private String recipient;  
    private String message;
    private String channel;    
}