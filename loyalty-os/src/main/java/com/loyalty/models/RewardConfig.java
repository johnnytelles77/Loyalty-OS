package com.loyalty.models;

import jakarta.persistence.*;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Entity
@Table(name="reward_config")
@Schema(description="Configuración de recompensas por negocio")
public class RewardConfig {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Schema(description="Cantidad de puntos necesarios para obtener una recompensa")
    private int puntosNecesarios;

    @Schema(description="Mensaje personalizado de progreso")
    private String mensajeProgreso;

    @Schema(description="ID del negocio propietario")
    private Long negocioId;
}
