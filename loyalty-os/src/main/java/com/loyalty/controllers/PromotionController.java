package com.loyalty.controllers;

import com.loyalty.models.Promotion;
import com.loyalty.services.PromotionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @Operation(summary = "Redeem a promotion for a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Promotion redeemed successfully"),
            @ApiResponse(responseCode = "400", description = "Not enough points or expired promotion"),
            @ApiResponse(responseCode = "404", description = "User or promotion not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
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

    @Operation(summary = "Get all promotions")
    @GetMapping
    public ResponseEntity<List<Promotion>> getAll() {
        return ResponseEntity.ok(promotionService.getAll());
    }

    @Operation(summary = "Get promotion by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Promotion> getById(@PathVariable Long id) {
        return ResponseEntity.ok(promotionService.getById(id));
    }

    @Operation(summary = "Get promotions by Business ID")
    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<Promotion>> getByBusinessId(@PathVariable Long businessId) {
        return ResponseEntity.ok(promotionService.getByBusinessId(businessId));
    }

    @Operation(summary = "Create a new promotion")
    @PostMapping
    public ResponseEntity<Promotion> create(@RequestBody Promotion promotion) {
        return new ResponseEntity<>(promotionService.create(promotion), HttpStatus.CREATED);
    }

    @Operation(summary = "Update a promotion by ID")
    @PutMapping("/{id}")
    public ResponseEntity<Promotion> update(@PathVariable Long id, @RequestBody Promotion updated) {
        return ResponseEntity.ok(promotionService.update(id, updated));
    }

    @Operation(summary = "Delete a promotion by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        promotionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}