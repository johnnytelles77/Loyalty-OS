package com.loyalty.services;

import com.loyalty.models.LoyaltyLog;
import com.loyalty.models.Promotion;
import com.loyalty.repositories.LoyaltyLogRepository;
import com.loyalty.repositories.PromotionRepository;
import com.loyalty.repositories.UserRepository;
import com.loyalty.dtos.NotificationDTO;

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

    @Transactional
    public String redeemPromotion(Long userId, Long promotionId) {
        // Buscar usuario
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Buscar promoción
        var promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found"));

        // Validar que la promoción esté vigente
        if (promotion.getEndDate() != null && promotion.getEndDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Promotion has expired");
        }

        // Validar que el usuario tenga suficientes puntos
        if (user.getPuntos() < promotion.getPointsRequired()) {
            throw new IllegalArgumentException("Not enough points to redeem this promotion");
        }

        // Descontar puntos al usuario
        user.setPuntos(user.getPuntos() - promotion.getPointsRequired());
        userRepository.save(user);

        // Registrar el movimiento en LoyaltyLog
        var log = new LoyaltyLog();
        log.setUser(user);
        log.setCantidad(promotion.getPointsRequired());
        log.setTipo("REDEEM");
        log.setFecha(LocalDateTime.now());
        loyaltyLogRepository.save(log);

        // Crear mensaje de confirmación
        String message = String.format(
                "🎁 You have redeemed the promotion '%s' for %d points! You now have %d points left.",
                promotion.getTitle(),
                promotion.getPointsRequired(),
                user.getPuntos()
        );

        // Enviar notificación al usuario (SMS)
        NotificationDTO notification = new NotificationDTO();
        notification.setChannel("SMS");
        notification.setRecipient(user.getTelefono());
        notification.setMessage(message);
        notificationService.sendNotification(notification);

        return message;
    }

    public List<Promotion> getAll() {
        return promotionRepository.findAll();
    }

    public Promotion getById(Long id) {
        return promotionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found with ID: " + id));
    }

    public List<Promotion> getByBusinessId(Long businessId) {
        return promotionRepository.findByBusinessId(businessId);
    }

    public Promotion create(Promotion promotion) {
        promotion.setStartDate(promotion.getStartDate() != null ? promotion.getStartDate() : LocalDateTime.now());
        return promotionRepository.save(promotion);
    }

    public Promotion update(Long id, Promotion updated) {
        Promotion promo = promotionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found"));

        promo.setTitle(updated.getTitle());
        promo.setDescription(updated.getDescription());
        promo.setPointsRequired(updated.getPointsRequired());
        promo.setStartDate(updated.getStartDate());
        promo.setEndDate(updated.getEndDate());
        promo.setBusinessId(updated.getBusinessId());

        return promotionRepository.save(promo);
    }

    public void delete(Long id) {
        if (!promotionRepository.existsById(id)) {
            throw new EntityNotFoundException("Promotion not found");
        }
        promotionRepository.deleteById(id);
    }
}