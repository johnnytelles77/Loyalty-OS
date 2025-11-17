package com.loyalty.services;

import com.loyalty.models.Business;
import com.loyalty.models.BusinessUserDetails;
import com.loyalty.repositories.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

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
        return new BusinessUserDetails(business);
    }
}