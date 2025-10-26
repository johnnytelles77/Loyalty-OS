package com.loyalty.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "DTO para representar una redención de promoción")
public class PromotionRedemptionDTO {

    @Schema(description = "ID de la redención")
    private Long id;

    @Schema(description = "Nombre del usuario")
    private String userName;

    @Schema(description = "Título de la promoción redimida")
    private String promotionTitle;

    @Schema(description = "Fecha y hora de la redención")
    private LocalDateTime redeemedAt;
}
