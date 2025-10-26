package com.loyalty.dtos;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LoyaltyLogDTO {
    private int cantidad;
    private String tipo;
    private LocalDateTime fecha;
    private Long userId;
}
