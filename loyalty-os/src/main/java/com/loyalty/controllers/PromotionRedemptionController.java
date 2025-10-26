package com.loyalty.controllers;

import com.loyalty.dtos.PromotionRedemptionDTO;
import com.loyalty.services.PromotionRedemptionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion-redemptions")
public class PromotionRedemptionController {

    @Autowired
    private PromotionRedemptionService promotionRedemptionService;

    @Operation(summary = "Get all promotion redemptions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of all redemptions")
    })
    @GetMapping
    public ResponseEntity<List<PromotionRedemptionDTO>> getAllRedemptions() {
        return ResponseEntity.ok(promotionRedemptionService.getAllRedemptions());
    }

    @Operation(summary = "Get redemptions by user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of user redemptions")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PromotionRedemptionDTO>> getRedemptionsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(promotionRedemptionService.getRedemptionsByUserId(userId));
    }
}