package com.loyalty.services;

import com.loyalty.dtos.NotificationDTO;
import com.loyalty.models.LoyaltyLog;
import com.loyalty.models.Promotion;
import com.loyalty.repositories.LoyaltyLogRepository;
import com.loyalty.repositories.PromotionRepository;
import com.loyalty.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoyaltyLogRepository loyaltyLogRepository;

    @Autowired
    private NotificationService notificationService;

    // =========================
    // REDEEM PROMOTION
    // =========================
    @Transactional
    public String redeemPromotion(Long userId, Long promotionId) {

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        var promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found"));

        System.out.println("NOW = " + LocalDateTime.now());
        System.out.println("PROMO(" + promotion.getId() + ") endDate = " + promotion.getEndDate() + " title=" + promotion.getTitle());

        if (promotion.getEndDate() != null &&
                promotion.getEndDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Promotion has expired");
        }

        if (user.getPuntos() < promotion.getPointsRequired()) {
            throw new IllegalArgumentException("Not enough points");
        }

        user.setPuntos(user.getPuntos() - promotion.getPointsRequired());
        userRepository.save(user);

        LoyaltyLog log = new LoyaltyLog();
        log.setUser(user);
        log.setCantidad(promotion.getPointsRequired());
        log.setTipo("REDEEM");
        log.setFecha(LocalDateTime.now());
        loyaltyLogRepository.save(log);

        // (opcional) notificación
        // NotificationDTO notification = new NotificationDTO();
        // notification.setChannel("SMS");
        // notification.setRecipient(user.getTelefono());
        // notification.setMessage("Promotion redeemed successfully");
        // notificationService.sendNotification(notification);

        return "Promotion redeemed successfully";
    }

    // =========================
    // READ
    // =========================
    public List<Promotion> getAll() {
        return promotionRepository.findAll();
    }

    public Promotion getById(Long id) {
        return promotionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found"));
    }

    public List<Promotion> getByBusinessId(Long businessId) {
        return promotionRepository.findByBusinessId(businessId);
    }

    // =========================
    // CREATE
    // =========================
    public Promotion create(Promotion promotion) {
        promotion.setStartDate(
                promotion.getStartDate() != null ? promotion.getStartDate() : LocalDateTime.now()
        );
        return promotionRepository.save(promotion);
    }

    // =========================
    // UPDATE (con validación de negocio)
    // =========================
    public Promotion update(Long id, Promotion updated, Long businessId) {

        Promotion promo = promotionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found"));

        if (promo.getBusinessId() == null || !promo.getBusinessId().equals(businessId)) {
            throw new IllegalArgumentException("Cannot update another business promotion");
        }

        promo.setTitle(updated.getTitle());
        promo.setDescription(updated.getDescription());
        promo.setPointsRequired(updated.getPointsRequired());
        promo.setStartDate(updated.getStartDate());
        promo.setEndDate(updated.getEndDate());

        // no permitimos cambiar dueño
        promo.setBusinessId(businessId);

        return promotionRepository.save(promo);
    }

    // =========================
    // DELETE (con validación de negocio)
    // =========================
    public void delete(Long id, Long businessId) {

        Promotion promo = promotionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found"));

        if (promo.getBusinessId() == null || !promo.getBusinessId().equals(businessId)) {
            throw new IllegalArgumentException("Cannot delete another business promotion");
        }

        promotionRepository.delete(promo);
    }
}