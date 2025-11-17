package com.loyalty.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.loyalty.models.RewardConfig;
import java.util.Optional;

@Repository
public interface RewardConfigRepository extends JpaRepository<RewardConfig, Long> {
    
    // Configuración de recompensas de un negocio
    Optional<RewardConfig> findByNegocioId(Long negocioId);
    
}