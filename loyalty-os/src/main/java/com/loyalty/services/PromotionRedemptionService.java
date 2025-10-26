package com.loyalty.services;

import com.loyalty.dtos.PromotionRedemptionDTO;
import com.loyalty.models.PromotionRedemption;
import com.loyalty.repositories.PromotionRedemptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionRedemptionService {

    @Autowired
    private PromotionRedemptionRepository redemptionRepository;

    public List<PromotionRedemptionDTO> getAllRedemptions() {
        return redemptionRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<PromotionRedemptionDTO> getRedemptionsByUserId(Long userId) {
        return redemptionRepository.findByUserId(userId).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private PromotionRedemptionDTO mapToDTO(PromotionRedemption redemption) {
        PromotionRedemptionDTO dto = new PromotionRedemptionDTO();
        dto.setId(redemption.getId());
        dto.setUserName(redemption.getUser().getNombre());
        dto.setPromotionTitle(redemption.getPromotion().getTitle());
        dto.setRedeemedAt(redemption.getRedemptionDate());
        return dto;
    }
}