package com.wellNexa.notificationservice.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wellNexa.notificationservice.dtos.MailRequestDto;
import com.wellNexa.notificationservice.services.EmailNotificationService;

@Component
@Slf4j
public class EmailConsumer {

    @Autowired
    private EmailNotificationService emailNotificationService;

    @RabbitListener(queues = "${rabbitmq.queue.email}")
    public void consumeEmailMessage(MailRequestDto mailRequestDto) {
        log.info("Received email request: {}", mailRequestDto);
        try {
            emailNotificationService.sendEmail(mailRequestDto);
            log.info("Email sent successfully");
        } catch (Exception e) {
            log.error("Failed to send email: {}", e.getMessage());
        }
    }
}
