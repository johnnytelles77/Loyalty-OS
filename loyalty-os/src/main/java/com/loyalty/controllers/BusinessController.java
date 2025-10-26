package com.loyalty.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import com.loyalty.dtos.BusinessDTO;
import com.loyalty.models.Business;
import com.loyalty.services.BusinessService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.*;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/businesses")
@Tag(name = "Gestión de Negocios", description = "Endpoints para gestionar los negocios registrados")
public class BusinessController {

    @Autowired
    private BusinessService businessService;


    @Operation(summary = "Obtener lista de negocios")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de negocios obtenida correctamente",
            content = { @Content(mediaType = "application/json", 
                schema = @Schema(implementation = Business.class)) }),
        @ApiResponse(responseCode = "404", description = "No se encontraron negocios",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping
    public ResponseEntity<List<Business>> getAllBusinesses() {
        try {
            List<Business> businesses = businessService.getAll();
            return ResponseEntity.ok(businesses); // 200
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }


    @Operation(summary = "Obtener un negocio por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Negocio obtenido correctamente",
            content = { @Content(mediaType = "application/json", 
                schema = @Schema(implementation = Business.class)) }),
        @ApiResponse(responseCode = "404", description = "No se encontró el negocio",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusinessById(@PathVariable Long id) {
        try {
            Business business = businessService.getById(id);
            return ResponseEntity.ok(business); // 200
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }

    @Operation(summary = "Obtener un negocio por su email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Negocio obtenido correctamente",
            content = { @Content(mediaType = "application/json", 
                schema = @Schema(implementation = Business.class)) }),
        @ApiResponse(responseCode = "404", description = "No se encontró el negocio con el email especificado",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/email/{email}")
    public ResponseEntity<Business> getBusinessByEmail(@PathVariable String email) {
        try {
            Business business = businessService.getByEmail(email);
            return ResponseEntity.ok(business); // 200
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }


    @Operation(summary = "Registrar un nuevo negocio")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Negocio creado correctamente",
            content = { @Content(mediaType = "application/json", 
                schema = @Schema(implementation = Business.class)) }),
        @ApiResponse(responseCode = "400", description = "Datos inválidos para crear el negocio",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseEntity<Business> createBusiness(@RequestBody BusinessDTO dto) {
        try {
            Business created = businessService.saveBusiness(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created); // 201
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // 400
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }


    @Operation(summary = "Actualizar los datos de un negocio")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Negocio actualizado correctamente",
            content = { @Content(mediaType = "application/json", 
                schema = @Schema(implementation = Business.class)) }),
        @ApiResponse(responseCode = "404", description = "Negocio no encontrado",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Business> updateBusinessById(@PathVariable Long id, @RequestBody BusinessDTO dto) {
        try {
            Business updated = businessService.updateBusiness(id, dto);
            return ResponseEntity.ok(updated); // 200
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }

    @Operation(summary = "Eliminar un negocio por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Negocio eliminado correctamente",
            content = { @Content(mediaType = "application/json", 
                schema = @Schema(implementation = Business.class)) }),
        @ApiResponse(responseCode = "404", description = "Negocio no encontrado",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor",
            content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ErrorResponse.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusinessById(@PathVariable Long id) {
        try {
            businessService.deleteBusiness(id);
            return ResponseEntity.noContent().build(); // 204
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }
}
