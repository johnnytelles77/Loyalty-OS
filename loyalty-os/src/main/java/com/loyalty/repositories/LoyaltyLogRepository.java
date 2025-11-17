package com.loyalty.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.loyalty.models.LoyaltyLog;

import java.util.List;

@Repository
public interface LoyaltyLogRepository extends JpaRepository<LoyaltyLog, Long> {

    // Historial de movimientos de un cliente
    List<LoyaltyLog> findByUserId(Long userId);

    // Historial de movimientos para todos los usuarios de un negocio
    List<LoyaltyLog> findByUserNegocioId(Long negocioId);

    // Contar logs por negocio
    long countByUserNegocioId(Long negocioId);
}
