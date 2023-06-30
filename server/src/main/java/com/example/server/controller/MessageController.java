package com.example.server.controller;

import com.example.server.model.SentMessage;
import com.example.server.services.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{chat-id}")
    public Set<SentMessage> getMessages(@PathVariable("chat-id") long chatId){
        return messageService.getMessages(chatId);
    }
}
