package com.loyalty.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;

public class BusinessUserDetails implements UserDetails, Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Business business;

    // ✅ Constructor correcto
    public BusinessUserDetails(Business business) {
        this.business = business;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = business.getRole();
        if (role == null || role.isBlank()) role = "ROLE_USER";
        if (!role.startsWith("ROLE_")) role = "ROLE_" + role;
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return business.getPassword();
    }

    @Override
    public String getUsername() {
        return business.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}