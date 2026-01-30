package com.loyalty.controllers;

import com.loyalty.config.JwtUtil;
import com.loyalty.dtos.PromotionResponseDTO;
import com.loyalty.models.Promotion;
import com.loyalty.services.PromotionService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/redeem")
    public ResponseEntity<String> redeem(@RequestParam Long userId, @RequestParam Long promotionId) {
        try {
            String message = promotionService.redeemPromotion(userId, promotionId);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error");
        }
    }

    @GetMapping
    public ResponseEntity<List<Promotion>> getAll() {
        return ResponseEntity.ok(promotionService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Promotion> getById(@PathVariable Long id) {
        return ResponseEntity.ok(promotionService.getById(id));
    }

    // ✅ Promos del negocio desde JWT
    @GetMapping("/business/my")
    public ResponseEntity<List<Promotion>> getMyPromotions(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "").trim();
        Long businessId = jwtUtil.extractBusinessId(token);
        return ResponseEntity.ok(promotionService.getByBusinessId(businessId));
    }

    // ✅ Create usando DTO + JWT, setea businessId siempre
    @PostMapping
    public ResponseEntity<PromotionResponseDTO> create(
            @RequestBody Promotion promotion,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "").trim();
        Long businessId = jwtUtil.extractBusinessId(token);

        promotion.setBusinessId(businessId);

        Promotion saved = promotionService.create(promotion);
        return new ResponseEntity<>(PromotionResponseDTO.from(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Promotion> update(
            @PathVariable Long id,
            @RequestBody Promotion updated,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "").trim();
        Long businessId = jwtUtil.extractBusinessId(token);

        Promotion promotion = promotionService.update(id, updated, businessId);
        return ResponseEntity.ok(promotion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "").trim();
        Long businessId = jwtUtil.extractBusinessId(token);

        promotionService.delete(id, businessId);
        return ResponseEntity.noContent().build();
    }
}