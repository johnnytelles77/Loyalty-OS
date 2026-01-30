package com.loyalty.controllers;

import com.loyalty.dtos.PointsTotalsDTO;
import com.loyalty.services.PointsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
        controllers = PointsController.class,
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = com.loyalty.config.JwtFilter.class
        )
)
@AutoConfigureMockMvc(addFilters = false)
class PointsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PointsService pointsService;

    @Test
    void getTotals_returns200_andJson() throws Exception {
        PointsTotalsDTO dto = PointsTotalsDTO.builder()
                .totalEarned(100)
                .totalRedeemed(30)
                .netPoints(70)
                .build();

        when(pointsService.getBusinessTotals("fake")).thenReturn(dto);

        mockMvc.perform(get("/api/points/totals")
                        .header("Authorization", "Bearer fake"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalEarned").value(100))
                .andExpect(jsonPath("$.totalRedeemed").value(30))
                .andExpect(jsonPath("$.netPoints").value(70));
    }
}