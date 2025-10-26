package com.loyalty.controllers;

import com.loyalty.dtos.LoyaltyLogDTO;
import com.loyalty.models.LoyaltyLog;
import com.loyalty.models.User;
import com.loyalty.services.LoyaltyLogService;
import com.loyalty.utils.Mapper;

import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/logs")
@Tag(name = "Loyalty Logs", description = "Endpoints to manage point history")
public class LoyaltyLogController {

    @Autowired
    private LoyaltyLogService logService;
    
    @Operation(summary = "Get all logs")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Logs retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @GetMapping
    public ResponseEntity<List<LoyaltyLog>> getAllLogs() {
        try {
            return ResponseEntity.ok(logService.getAllLogs());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    

    @Operation(summary = "Get logs by user ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Logs retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoyaltyLog>> getLogsByUser(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(logService.getLogsByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Create a new log entry and return updated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Log created successfully"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @PostMapping
    public ResponseEntity<Map<String, Object>> createLog(@RequestBody LoyaltyLogDTO dto) {
        try {
            LoyaltyLog savedLog = logService.saveLog(dto);
            User updatedUser = logService.getUserById(dto.getUserId());

            Map<String, Object> response = new HashMap<>();
            response.put("log", savedLog);
            response.put("user", Mapper.toUserDTO(updatedUser));

            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @Operation(summary = "Update a log by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Log updated successfully"),
        @ApiResponse(responseCode = "404", description = "Log not found"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @PutMapping("/{logId}")
    public ResponseEntity<LoyaltyLog> updateLog(@PathVariable Long logId, @RequestBody LoyaltyLogDTO dto) {
        try {
            LoyaltyLog updatedLog = logService.updateLog(logId, dto);
            return ResponseEntity.ok(updatedLog);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Delete a log by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Log deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Log not found"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @DeleteMapping("/{logId}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long logId) {
        try {
            logService.deleteLog(logId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
