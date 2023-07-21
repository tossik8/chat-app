package com.example.server.model;

import lombok.Data;

@Data
public class ConnectRequest {
    private long senderId;
    private long receiverId;
    private String text;
}
