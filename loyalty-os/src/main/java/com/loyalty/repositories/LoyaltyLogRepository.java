package com.loyalty.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.loyalty.models.LoyaltyLog;

import java.util.List;

@Repository
public interface LoyaltyLogRepository extends JpaRepository<LoyaltyLog, Long> {
    List<LoyaltyLog> findByUserId(Long userId); // historial por cliente
}

