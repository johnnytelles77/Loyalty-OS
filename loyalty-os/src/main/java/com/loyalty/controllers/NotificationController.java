package com.loyalty.controllers;

import com.loyalty.dtos.NotificationDTO;
import com.loyalty.services.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@Tag(name = "Notifications", description = "Send SMS or Email messages to clients")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    @Operation(
            summary = "Send a notification to a client",
            description = "Sends a personalized message via SMS or Email to a user in the system.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Notification sent successfully",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = String.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content)
            }
    )
    public String sendNotification(@RequestBody NotificationDTO notificationDTO) {
        return notificationService.sendNotification(notificationDTO);
    }
}
