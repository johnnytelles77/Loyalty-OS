package com.loyalty.models;

import jakarta.persistence.*;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name="businesses")
@Schema(description="Modelo de negocio registrado en LoyaltyOS")
public class Business {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Schema(description="Nombre del negocio")
    @Column(nullable=false)
    private String nombre;

    @Schema(description="Correo electrónico del negocio")
    @Column(nullable=false, unique=true)
    private String email;

    @Schema(description="Contraseña encriptada")
    private String password;

    @Schema(description="Rol del negocio (ej. ROLE_BUSINESS)")
    private String role;

    @OneToMany(mappedBy="negocio", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    @JsonIgnore
    private List<User> clientes = new ArrayList<>();
}
