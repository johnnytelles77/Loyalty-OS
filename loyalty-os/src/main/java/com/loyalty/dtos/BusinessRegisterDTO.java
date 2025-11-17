package com.loyalty.dtos;

import lombok.Data;

@Data
public class BusinessRegisterDTO {
    private String nombre;
    private String email;
    private String password;
    private String role;
}
