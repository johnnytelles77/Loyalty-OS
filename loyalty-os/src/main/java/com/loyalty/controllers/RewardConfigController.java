package com.loyalty.controllers;

import com.loyalty.dtos.RewardConfigDTO;
import com.loyalty.models.RewardConfig;
import com.loyalty.services.RewardConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@Tag(name = "Reward Configuration", description = "Endpoints to manage reward settings")
public class RewardConfigController {

    @Autowired
    private RewardConfigService rewardService;

    @Operation(summary = "Get all reward configs")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Reward configs retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @GetMapping
    public ResponseEntity<List<RewardConfig>> getAllConfigs() {
        try {
            return ResponseEntity.ok(rewardService.getAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Get reward config by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Reward config retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "Reward config not found"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @GetMapping("/{id}")
    public ResponseEntity<RewardConfig> getById(@PathVariable Long id) {
        try {
            RewardConfig config = rewardService.getById(id);
            return ResponseEntity.ok(config);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Get reward config by business ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Reward config retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "Reward config not found"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @GetMapping("/business/{businessId}")
    public ResponseEntity<RewardConfig> getByBusiness(@PathVariable Long businessId) {
        try {
            RewardConfig config = rewardService.getByNegocioId(businessId);
            if (config == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            return ResponseEntity.ok(config);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Create a new reward config")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Reward config created successfully"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @PostMapping
    public ResponseEntity<RewardConfig> create(@RequestBody RewardConfigDTO dto) {
        try {
            RewardConfig created = rewardService.create(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Update reward config partially")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Reward config updated successfully"),
        @ApiResponse(responseCode = "404", description = "Reward config not found"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @PutMapping("/{id}")
    public ResponseEntity<RewardConfig> update(@PathVariable Long id, @RequestBody RewardConfigDTO dto) {
        try {
            RewardConfig updated = rewardService.updateConfig(id, dto);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Delete a reward config by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Reward config deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Reward config not found"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            rewardService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

