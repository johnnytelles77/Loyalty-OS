package com.loyalty.services;

import com.loyalty.dtos.NotificationDTO;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public String sendNotification(NotificationDTO notificationDTO) {
        String type = notificationDTO.getChannel() != null ? notificationDTO.getChannel().toUpperCase() : "UNKNOWN";
        String message = String.format(
                "📨 Notification sent via %s to %s: %s",
                type,
                notificationDTO.getRecipient(),
                notificationDTO.getMessage()
        );

        System.out.println(message);
        return message;
    }

    // Método nuevo para enviar SMS directamente
    public String sendSms(String phoneNumber, String message) {
        NotificationDTO dto = new NotificationDTO();
        dto.setChannel("SMS");
        dto.setRecipient(phoneNumber);
        dto.setMessage(message);

        return sendNotification(dto);
    }
}