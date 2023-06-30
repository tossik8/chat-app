package com.example.server.model;

import lombok.Data;

@Data
public class Message {
    private String text;
    private long chatId;
    private long senderId;
}
