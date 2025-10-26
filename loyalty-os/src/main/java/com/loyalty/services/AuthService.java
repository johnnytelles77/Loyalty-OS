package com.loyalty.services;

import com.loyalty.dtos.BusinessDTO;
import com.loyalty.models.Business;
import com.loyalty.repositories.BusinessRepository;
import com.loyalty.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Registro: devuelve token directamente
    public String register(BusinessDTO dto) {
        if (businessRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email ya existe");
        }

        Business business = new Business();
        business.setEmail(dto.getEmail());
        business.setNombre(dto.getNombre());
        business.setPassword(passwordEncoder.encode(dto.getPassword()));

        businessRepository.save(business);

        // Generar token automáticamente
        return jwtUtil.generateToken(dto.getEmail());
    }

    // Login: valida credenciales y devuelve token
    public String login(String email, String password) {
        Business business = businessRepository.findByEmail(email);
        if (business == null || !passwordEncoder.matches(password, business.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return jwtUtil.generateToken(email);
    }
}
