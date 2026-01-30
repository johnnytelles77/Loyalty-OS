package com.loyalty.controllers;

import com.loyalty.config.JwtUtil;
import com.loyalty.dtos.PromotionResponseDTO;
import com.loyalty.models.Promotion;
import com.loyalty.services.PromotionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
        controllers = PromotionController.class,
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = com.loyalty.config.JwtFilter.class
        )
)
@AutoConfigureMockMvc(addFilters = false)
class PromotionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PromotionService promotionService;

    @MockitoBean
    private JwtUtil jwtUtil;

    @Test
    void createPromotion_returns201_andBusinessIdInResponse() throws Exception {
        String token = "Bearer fake";
        when(jwtUtil.extractBusinessId("fake")).thenReturn(1L);

        Promotion saved = new Promotion();
        saved.setId(10L);
        saved.setTitle("Promo");
        saved.setDescription("Desc");
        saved.setPointsRequired(20);
        saved.setBusinessId(1L);

        when(promotionService.create(any(Promotion.class))).thenReturn(saved);

        String body = """
                {
                  "title": "Promo",
                  "description": "Desc",
                  "pointsRequired": 20,
                  "businessId": null
                }
                """;

        mockMvc.perform(post("/api/promotions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", token)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.businessId").value(1));
    }

    @Test
    void redeemPromotion_returns200() throws Exception {
        when(promotionService.redeemPromotion(19L, 12L)).thenReturn("Promotion redeemed successfully");

        mockMvc.perform(post("/api/promotions/redeem")
                        .param("userId", "19")
                        .param("promotionId", "12"))
                .andExpect(status().isOk())
                .andExpect(content().string("Promotion redeemed successfully"));
    }

    @Test
    void redeemPromotion_whenExpired_returns400() throws Exception {
        when(promotionService.redeemPromotion(19L, 12L))
                .thenThrow(new IllegalArgumentException("Promotion has expired"));

        mockMvc.perform(post("/api/promotions/redeem")
                        .param("userId", "19")
                        .param("promotionId", "12"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Promotion has expired"));
    }

    @Test
    void getMyPromotions_returns200() throws Exception {
        when(jwtUtil.extractBusinessId("fake")).thenReturn(1L);
        when(promotionService.getByBusinessId(1L)).thenReturn(java.util.List.of());

        mockMvc.perform(get("/api/promotions/business/my")
                        .header("Authorization", "Bearer fake"))
                .andExpect(status().isOk());
    }
}
