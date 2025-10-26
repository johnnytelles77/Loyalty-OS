package com.loyalty.controllers;

import com.loyalty.dtos.BusinessDTO;
import com.loyalty.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Endpoints for business registration and login")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Operation(summary = "Register a new business and receive JWT token")
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody BusinessDTO dto) {
        try {
            String token = authService.register(dto);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @Operation(summary = "Login and receive JWT token")
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody BusinessDTO dto) {
        try {
            String token = authService.login(dto.getEmail(), dto.getPassword());
            Map<String, String> response = new HashMap<>();
            response.put("token", token); // ahora es un JSON con "token"
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Credenciales inválidas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

}