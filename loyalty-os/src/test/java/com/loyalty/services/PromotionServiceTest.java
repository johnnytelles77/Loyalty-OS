package com.loyalty.services;
import com.loyalty.models.LoyaltyLog;
import com.loyalty.models.Promotion;
import com.loyalty.models.User;
import com.loyalty.repositories.LoyaltyLogRepository;
import com.loyalty.repositories.PromotionRepository;
import com.loyalty.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PromotionServiceTest {
    @Mock
    private PromotionRepository promotionRepository;

    @Mock
    private LoyaltyLogRepository loyaltyLogRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private PromotionService promotionService;

    @Test
    void redeemPromotion_success_deductsPointsAndCreateLog() {
        // 1) Arrange: armamos datos reales (User y Promotion) Mock
        Long userId = 19L;
        Long promoId = 12L;

        User user = new User();
        user.setPuntos(100);
        user.setTelefono("123");

        Promotion promo = new Promotion();
        promo.setId(promoId);
        promo.setTitle("prueba6");
        promo.setPointsRequired(20);
        promo.setEndDate(LocalDateTime.now().plusDays(30));

        // 2) Arrange: decimos qué deben regresar
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(promotionRepository.findById(promoId)).thenReturn(Optional.of(promo));

        // 3) Act: ejecutamos el método real del service
        String result =  promotionService.redeemPromotion(userId, promoId);

        // 4) Assert: verificamos respuesta y efectos
        assertEquals("Promotion redeemed successfully", result);
        assertEquals(80, user.getPuntos(), "Debe descontar 20 puntos");

        // 5) Verify: confirmamos que guardó el user
        verify(userRepository).save(user);

        // 6) Verify + capturar: revisar el LoyaltyLog que se guardó
        ArgumentCaptor<LoyaltyLog> logCaptor = ArgumentCaptor.forClass(LoyaltyLog.class);
        verify(loyaltyLogRepository).save(logCaptor.capture());

        LoyaltyLog savedLog = logCaptor.getValue();
        assertNotNull(savedLog);
        assertEquals("REDEEM", savedLog.getTipo());
        assertEquals(20, savedLog.getCantidad());
        assertEquals(user, savedLog.getUser());
    }

    @Test
    void redeemPromotion_expiredPromotion_throwsIllegalArgumentException() {
        Long userId = 19L;
        Long promoId = 12L;

        User user = new User();
        user.setPuntos(100);

        Promotion promo = new Promotion();
        promo.setPointsRequired(20);
        promo.setEndDate(LocalDateTime.now().minusMinutes(1));
        promo.setTitle("expired promo");
        promo.setId(promoId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(promotionRepository.findById(promoId)).thenReturn(Optional.of(promo));

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> promotionService.redeemPromotion(userId, promoId)
        );

        assertEquals("Promotion has expired", ex.getMessage());

        verify(userRepository, never()).save(any());
        verify(loyaltyLogRepository, never()).save(any());
    }

    @Test
    void not_enough_points() {
        Long userId = 19L;
        Long promoId = 12L;

        User user = new User();
        user.setPuntos(10);

        Promotion promo = new Promotion();
        promo.setPointsRequired(20);
        promo.setEndDate(LocalDateTime.now().plusDays(1));
        promo.setTitle("expired promo");
        promo.setId(promoId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(promotionRepository.findById(promoId)).thenReturn(Optional.of(promo));

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> promotionService.redeemPromotion(userId, promoId)
        );

        assertEquals("Not enough points", ex.getMessage());

        verify(userRepository, never()).save(any());
        verify(loyaltyLogRepository, never()).save(any());
    }

    @Test
    void redeemPromotion_userNotFound_throwsEntityNotFoundException() {
        Long userId = 9L;
        Long promoId = 12L;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(
                EntityNotFoundException.class,
                () -> promotionService.redeemPromotion(userId, promoId)
        );

        assertEquals("User not found", ex.getMessage());

        verify(promotionRepository, never()).findById(anyLong());
        verify(userRepository, never()).save(any());
        verify(loyaltyLogRepository, never()).save(any());
    }

    @Test
    void redeemPromotion_notEnoughPoints_throwsIllegalArgumentException() {
        User user = new User();
        user.setId(1L);
        user.setPuntos(5);

        Promotion promo = new Promotion();
        promo.setId(10L);
        promo.setPointsRequired(20);
        promo.setEndDate(LocalDateTime.now().plusDays(1));

        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(promotionRepository.findById(10L)).thenReturn(Optional.of(promo));

        assertThrows(IllegalArgumentException.class, () -> {
            promotionService.redeemPromotion(1L, 10L);
        });

        verify(userRepository, never()).save(any());
        verify(loyaltyLogRepository, never()).save(any());
    }

    @Test
    void redeemPromotion_promotionNotFound_throwsEntityNotFoundException() {
        Long userId = 19L;
        Long promoId = 99L;

        User user = new User();
        user.setPuntos(100);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        when(promotionRepository.findById(promoId)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(
                EntityNotFoundException.class,
                () -> promotionService.redeemPromotion(userId, promoId)
        );

        assertEquals("Promotion not found", ex.getMessage());

        verify(userRepository, never()).save(any());
        verify(loyaltyLogRepository, never()).save(any());

    }

    @Test
    void update_whenPromotionBelongsToAnotherBusiness_throwsIllegalArgumentException(){
        Long promoId = 10L;

        Promotion existing = new Promotion();
        existing.setId(promoId);
        existing.setBusinessId(1L);

        Promotion updated = new Promotion();
        updated.setTitle("new");
        updated.setDescription("new");
        updated.setPointsRequired(50);

        when(promotionRepository.findById(promoId)).thenReturn(Optional.of(existing));

        Long otherBusinessId = 2L;

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> promotionService.update(promoId, updated, otherBusinessId)
        );
        assertEquals("Cannot update another business promotion", ex.getMessage());

        verify(promotionRepository, never()).save(any());
    }

    @Test
    void update_whenPromotionBelongsToBusiness_updatesAndSaves() {
        Long promoId = 10L;
        Long businessId = 1L;

        Promotion existing = new Promotion();
        existing.setId(promoId);
        existing.setBusinessId(businessId);
        existing.setTitle("old");
        existing.setDescription("old");
        existing.setPointsRequired(10);

        Promotion updated = new Promotion();
        updated.setTitle("new title");
        updated.setDescription("new desc");
        updated.setPointsRequired(50);
        updated.setStartDate(LocalDateTime.now());
        updated.setEndDate(LocalDateTime.now().plusDays(10));

        when(promotionRepository.findById(promoId)).thenReturn(Optional.of(existing));
        when(promotionRepository.save(any(Promotion.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Promotion saved = promotionService.update(promoId, updated, businessId);

        assertEquals("new title", saved.getTitle());
        assertEquals("new desc", saved.getDescription());
        assertEquals(50, saved.getPointsRequired());

        assertEquals(businessId, saved.getBusinessId());

        verify(promotionRepository).save(any(Promotion.class));
   }

   @Test
    void delete_whenPromotionBelongsToAnotherBusiness_throwsIllegalArgumentException() {
        Long promoId = 10L;

        Promotion existing = new Promotion();
        existing.setId(promoId);
        existing.setBusinessId(1L);

        when(promotionRepository.findById(promoId)).thenReturn(Optional.of(existing));

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> promotionService.delete(promoId, 2L)
        );
        assertEquals("Cannot delete another business promotion", ex.getMessage());
        verify(promotionRepository, never()).delete(any(Promotion.class));
   }

   @Test
    void delete_whenPromotionBelongsToBusiness_deletes() {
        Long promoId = 10L;
        Long businessId = 1L;

        Promotion existing = new Promotion();
        existing.setId(promoId);
        existing.setBusinessId(businessId);

        when(promotionRepository.findById(promoId)).thenReturn(Optional.of(existing));

        promotionService.delete(promoId, businessId);
        verify(promotionRepository).delete(existing);
   }
}
