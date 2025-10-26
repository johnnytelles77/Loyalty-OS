package com.loyalty.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.loyalty.models.Business;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
	 boolean existsByEmail(String email);
    Business findByEmail(String email); // útil para login

}


