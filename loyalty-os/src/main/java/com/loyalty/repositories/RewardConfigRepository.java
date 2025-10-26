package com.loyalty.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.loyalty.models.RewardConfig;

@Repository
public interface RewardConfigRepository extends JpaRepository<RewardConfig, Long> {
    RewardConfig findByNegocioId(Long negocioId); // configuración por negocio
}
