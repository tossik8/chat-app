package com.example.server.controller;

import com.example.server.model.*;
import com.example.server.services.ChatService;
import com.example.server.services.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


@Controller
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;
    private final ChatService chatService;

    public ChatController(SimpMessagingTemplate simpMessagingTemplate, MessageService messageService, ChatService chatService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageService = messageService;
        this.chatService = chatService;
    }

    @MessageMapping("/message")
    public void sendToChat(@Payload Message message){
        SentMessage sentMessage = messageService.saveMessage(message);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(message.getChatId()),
                "/queue/messages", sentMessage);
    }
    @MessageMapping("/connection")
    public void connectUsers(@Payload ConnectRequest connectRequest){
        SentChat chat = chatService.saveChat(connectRequest);
        Message message = new Message(chat.getId(), connectRequest.getSenderId(), connectRequest.getText());
        SentMessage sentMessage = messageService.saveMessage(message);
        chat.getMessages().add(sentMessage);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(connectRequest.getSenderId()),
                "/queue/connections", chat);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(connectRequest.getReceiverId()),
                "/queue/connections", chat);
    }
}
