package com.loyalty.models;

import jakarta.persistence.*;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name="users")
@Schema(description="Modelo de usuario/cliente")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Schema(description="Nombre del usuario")
    @Column(nullable=false)
    private String nombre;

    @Schema(description="Teléfono único del usuario")
    @Column(nullable=false, unique=true)
    private String telefono;

    @Schema(description="Correo electrónico")
    private String email;

    @Schema(description="Puntos de fidelidad")
    private int puntos;

    @OneToMany(mappedBy="user", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    
    @JsonIgnore
    private List<LoyaltyLog> loyaltyLogs = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business negocio;
}
