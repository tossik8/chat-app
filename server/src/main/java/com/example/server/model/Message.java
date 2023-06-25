package com.example.server.model;

import lombok.Data;

@Data
public class Message {
    private String from;
    private String text;
    private long chatId;
    private long senderId;
    private String time;
}
