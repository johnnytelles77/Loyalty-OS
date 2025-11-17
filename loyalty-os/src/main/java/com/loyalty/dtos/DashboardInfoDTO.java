package com.loyalty.dtos;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardInfoDTO {
    private String businessName;
    private long totalUsers;
    private long totalPointsEarned;
    private long totalPointsRedeemed;
    private List<RecentActivityDTO> recentActivities;
    private RewardConfigDTO rewardConfig;
}