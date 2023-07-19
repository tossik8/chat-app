package com.example.server.controller;

import com.example.server.model.Message;
import com.example.server.model.SentMessage;
import com.example.server.services.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


@Controller
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;

    public ChatController(SimpMessagingTemplate simpMessagingTemplate, MessageService messageService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageService = messageService;
    }

    @MessageMapping("/message")
    public void sendToChat(@Payload Message message){
        SentMessage sentMessage = messageService.saveMessage(message);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(message.getChatId()),
                "/queue/messages", sentMessage);
    }
}
