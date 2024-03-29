package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Message {
    private long chatId;
    private long senderId;
    private String text;
}
