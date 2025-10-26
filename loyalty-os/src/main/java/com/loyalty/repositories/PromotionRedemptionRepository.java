package com.loyalty.repositories;

import com.loyalty.models.PromotionRedemption;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PromotionRedemptionRepository extends JpaRepository<PromotionRedemption, Long> {
    List<PromotionRedemption> findByUserId(Long userId);
}
