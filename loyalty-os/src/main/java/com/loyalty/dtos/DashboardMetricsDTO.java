package com.loyalty.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardMetricsDTO {
    private long totalClients;
    private int netPoints;
    private long activePromotions;
}
