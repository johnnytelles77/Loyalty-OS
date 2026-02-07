package com.loyalty.repositories;

import com.loyalty.models.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    // ya lo tenías
    List<Promotion> findByBusinessId(Long businessId);

    // ✅ nuevos para métricas
    long countByBusinessIdAndEndDateAfter(Long businessId, LocalDateTime now);

    long countByBusinessIdAndEndDateIsNull(Long businessId);
}