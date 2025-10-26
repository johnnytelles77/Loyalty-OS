package com.loyalty.services;

import com.loyalty.models.Business;
import com.loyalty.repositories.BusinessRepository;
import com.loyalty.dtos.BusinessDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BusinessService {

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Crear un nuevo negocio
    public Business saveBusiness(BusinessDTO dto) {
        Business business = new Business();
        business.setNombre(dto.getNombre());
        business.setEmail(dto.getEmail());
        business.setPassword(passwordEncoder.encode(dto.getPassword()));
        business.setRole(dto.getRole());
        return businessRepository.save(business);
    }

    // Obtener todos los negocios
    public List<Business> getAll() {
        return businessRepository.findAll();
    }

    // Obtener negocio por email
    public Business getByEmail(String email) {
        return businessRepository.findByEmail(email);
    }

    // Obtener negocio por ID
    public Business getById(Long id) {
        Optional<Business> opt = businessRepository.findById(id);
        if (opt.isEmpty()) {
            throw new IllegalArgumentException("Business con id " + id + " no encontrado");
        }
        return opt.get();
    }

    // Actualizar negocio existente
    public Business updateBusiness(Long id, BusinessDTO dto) {
        Optional<Business> optionalBusiness = businessRepository.findById(id);
        if (optionalBusiness.isPresent()) {
            Business business = optionalBusiness.get();
            business.setNombre(dto.getNombre());
            business.setEmail(dto.getEmail());
            if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
                business.setPassword(passwordEncoder.encode(dto.getPassword()));
            }
            business.setRole(dto.getRole());
            return businessRepository.save(business);
        } else {
            throw new RuntimeException("Business not found with id: " + id);
        }
    }

    // Eliminar negocio
    public void deleteBusiness(Long id) {
        businessRepository.deleteById(id);
    }
}
