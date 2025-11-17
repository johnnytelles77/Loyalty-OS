package com.loyalty.repositories;

import com.loyalty.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    long countByNegocioId(Long negocioId);
    List<User> findByNegocioId(Long negocioId);
    Optional<User> findByTelefono(String telefono);
}