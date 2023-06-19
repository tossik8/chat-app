package com.example.server.model;

import lombok.Data;

@Data
public class Message {
    private String from;
    private String text;
    private String chatId;
}
