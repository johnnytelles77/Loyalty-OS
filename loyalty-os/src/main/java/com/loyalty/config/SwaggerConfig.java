package com.loyalty.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                // Información general de la API
                .info(new Info()
                        .title("Loyalty API | Java | LoyaltyApp")
                        .version("1.0.0")
                        .description("La API proporciona endpoints para administrar negocios, clientes y puntos de fidelidad en la plataforma. "
                                + "Permite operaciones CRUD sobre negocios y transacciones de clientes. "
                                + "Está documentada con Swagger, facilitando su uso y comprensión.")
                        .contact(new Contact()
                                .name("Johnny Telles")
                                .email("tu-email@dominio.com")
                                .url("https://tudominio.com"))
                        .license(new License()
                                .name("Licencia MIT")
                                .url("https://github.com/johnnytelles77")))
                // Servidores
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor Local")))
                // Seguridad con JWT Bearer
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}