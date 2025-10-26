package com.loyalty.services;

import com.loyalty.models.Business;
import com.loyalty.repositories.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private BusinessRepository businessRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Business business = businessRepository.findByEmail(email);
        if (business == null) {
            throw new UsernameNotFoundException("Negocio no encontrado con email: " + email);
        }

     // Obtener rol desde la BD
        String role = business.getRole();

        // Si está vacío o null, asignar uno por defecto
        if (role == null || role.isBlank()) {
            role = "ROLE_USER";
        }

        // Si no empieza con ROLE_, lo agregamos automáticamente
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        return new org.springframework.security.core.userdetails.User(
            business.getEmail(),
            business.getPassword(),
            Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}
