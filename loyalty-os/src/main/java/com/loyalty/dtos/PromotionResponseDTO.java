package com.loyalty.dtos;

import com.loyalty.models.Promotion;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PromotionResponseDTO {
    private Long id;
    private String title;
    private String description;
    private int pointsRequired;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long businessId;

    public static PromotionResponseDTO from(Promotion p) {
        PromotionResponseDTO dto = new PromotionResponseDTO();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setDescription(p.getDescription());
        dto.setPointsRequired(p.getPointsRequired());
        dto.setStartDate(p.getStartDate());
        dto.setEndDate(p.getEndDate());
        dto.setBusinessId(p.getBusinessId());
        return dto;
    }
}