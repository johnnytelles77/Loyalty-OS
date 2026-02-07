package com.loyalty.services;

import com.loyalty.config.JwtUtil;
import com.loyalty.dtos.DashboardMetricsDTO;
import com.loyalty.models.Business;
import com.loyalty.repositories.LoyaltyLogRepository;
import com.loyalty.repositories.PromotionRepository;
import com.loyalty.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DashboardService {

    private final JwtUtil jwtUtil;
    private final BusinessService businessService;
    private final UserRepository userRepository;
    private final LoyaltyLogRepository loyaltyLogRepository;
    private final PromotionRepository promotionRepository;

    public DashboardService(
            JwtUtil jwtUtil,
            BusinessService businessService,
            UserRepository userRepository,
            LoyaltyLogRepository loyaltyLogRepository,
            PromotionRepository promotionRepository
    ) {
        this.jwtUtil = jwtUtil;
        this.businessService = businessService;
        this.userRepository = userRepository;
        this.loyaltyLogRepository = loyaltyLogRepository;
        this.promotionRepository = promotionRepository;
    }

    public DashboardMetricsDTO getMetrics(String rawToken) {
        // rawToken viene limpio (sin "Bearer ")
        String email = jwtUtil.extractEmail(rawToken);

        Business business = businessService.getByEmail(email);
        if (business == null) {
            throw new IllegalArgumentException("Negocio no encontrado");
        }

        Long negocioId = business.getId();

        // ✅ clientes (tu repo ya usa negocioId)
        long totalClients = userRepository.countByNegocioId(negocioId);

        // ✅ puntos netos (ya lo usas en PointsService)
        int earned = loyaltyLogRepository.totalPointsEarned(negocioId);
        int redeemed = loyaltyLogRepository.totalPointsRedeemed(negocioId);
        int netPoints = earned - redeemed;

        // ✅ promociones activas (endDate futuro + sin endDate)
        long activeWithEndDate = promotionRepository.countByBusinessIdAndEndDateAfter(negocioId, LocalDateTime.now());
        long activeNoEndDate = promotionRepository.countByBusinessIdAndEndDateIsNull(negocioId);
        long activePromotions = activeWithEndDate + activeNoEndDate;

        return new DashboardMetricsDTO(totalClients, netPoints, activePromotions);
    }
}
