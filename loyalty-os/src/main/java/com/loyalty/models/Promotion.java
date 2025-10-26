package com.loyalty.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "promotions")
@Data
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private int pointsRequired;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private Long businessId;
}
