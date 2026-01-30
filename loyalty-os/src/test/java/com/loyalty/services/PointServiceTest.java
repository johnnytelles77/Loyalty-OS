package com.loyalty.services;

import com.loyalty.config.JwtUtil;
import com.loyalty.dtos.LoyaltyLogDTO;
import com.loyalty.dtos.PointsTotalsDTO;
import com.loyalty.models.Business;
import com.loyalty.models.LoyaltyLog;
import com.loyalty.models.User;
import com.loyalty.repositories.LoyaltyLogRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PointsServiceTest {

    @Mock private LoyaltyLogRepository loyaltyLogRepository;
    @Mock private BusinessService businessService;
    @Mock private JwtUtil jwtUtil;

    @InjectMocks private PointsService pointsService;

    @Test
    void getBusinessTotals_success_returnsCorrectTotals() {
        String token = "fake-token";
        String email = "biz@test.com";

        Business business = new Business();
        business.setId(1L);

        when(jwtUtil.extractEmail(token)).thenReturn(email);
        when(businessService.getByEmail(email)).thenReturn(business);

        when(loyaltyLogRepository.totalPointsEarned(1L)).thenReturn(100);
        when(loyaltyLogRepository.totalPointsRedeemed(1L)).thenReturn(30);

        PointsTotalsDTO result = pointsService.getBusinessTotals(token);

        assertEquals(100, result.getTotalEarned());
        assertEquals(30, result.getTotalRedeemed());
        assertEquals(70, result.getNetPoints());
    }

    @Test
    void getBusinessTotals_businessNotFound_throwsIllegalArgumentException() {
        String token = "fake-token";
        String email = "missing@test.com";

        when(jwtUtil.extractEmail(token)).thenReturn(email);
        when(businessService.getByEmail(email)).thenReturn(null);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> pointsService.getBusinessTotals(token)
        );

        assertEquals("Negocio no encontrado", ex.getMessage());

        verify(loyaltyLogRepository, never()).totalPointsEarned(anyLong());
        verify(loyaltyLogRepository, never()).totalPointsRedeemed(anyLong());
    }

    @Test
    void getBusinessHistory_withTipo_callsCorrectRepoAndReturnsDtos() {
        String token = "fake-token";
        String email = "biz@test.com";

        Business business = new Business();
        business.setId(1L);

        when(jwtUtil.extractEmail(token)).thenReturn(email);
        when(businessService.getByEmail(email)).thenReturn(business);

        LoyaltyLog log = new LoyaltyLog();
        log.setTipo("REDEEM");
        log.setCantidad(10);
        log.setFecha(LocalDateTime.now());

        User user = new User();
        user.setId(5L);
        log.setUser(user);

        Page<LoyaltyLog> logsPage = new PageImpl<>(List.of(log));

        when(loyaltyLogRepository.findByUserNegocioIdAndTipo(eq(1L), eq("REDEEM"), any(Pageable.class)))
                .thenReturn(logsPage);

        Page<LoyaltyLogDTO> result = pointsService.getBusinessHistory(token, 0, 10, "REDEEM");

        assertEquals(1, result.getTotalElements());
        assertEquals("REDEEM", result.getContent().get(0).getTipo());

        verify(loyaltyLogRepository).findByUserNegocioIdAndTipo(eq(1L), eq("REDEEM"), any(Pageable.class));
        verify(loyaltyLogRepository, never()).findByUserNegocioId(anyLong(), any(Pageable.class));
    }

    @Test
    void getBusinessHistory_withoutTipo_callsCorrectRepoAndReturnsDtos() {
        String token = "fake-token";
        String email = "biz@test.com";

        Business business = new Business();
        business.setId(1L);

        when(jwtUtil.extractEmail(token)).thenReturn(email);
        when(businessService.getByEmail(email)).thenReturn(business);

        LoyaltyLog log = new LoyaltyLog();
        log.setTipo("EARN");
        log.setCantidad(5);
        log.setFecha(LocalDateTime.now());

        User user = new User();
        user.setId(5L);
        log.setUser(user);

        Page<LoyaltyLog> logsPage = new PageImpl<>(List.of(log));

        when(loyaltyLogRepository.findByUserNegocioId(eq(1L), any(Pageable.class)))
                .thenReturn(logsPage);

        Page<LoyaltyLogDTO> result = pointsService.getBusinessHistory(token, 0, 10, null);

        assertEquals(1, result.getTotalElements());
        assertEquals("EARN", result.getContent().get(0).getTipo());

        verify(loyaltyLogRepository).findByUserNegocioId(eq(1L), any(Pageable.class));
        verify(loyaltyLogRepository, never()).findByUserNegocioIdAndTipo(anyLong(), anyString(), any(Pageable.class));
    }

    @Test
    void getBusinessHistory_businessNotFound_throwsIllegalArgumentException() {
        String token = "fake-token";
        String email = "missing@test.com";

        when(jwtUtil.extractEmail(token)).thenReturn(email);
        when(businessService.getByEmail(email)).thenReturn(null);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> pointsService.getBusinessHistory(token, 0, 10, "REDEEM")
        );

        assertEquals("Negocio no encontrado", ex.getMessage());

        verify(loyaltyLogRepository, never()).findByUserNegocioId(anyLong(), any(Pageable.class));
        verify(loyaltyLogRepository, never()).findByUserNegocioIdAndTipo(anyLong(), anyString(), any(Pageable.class));
    }
}