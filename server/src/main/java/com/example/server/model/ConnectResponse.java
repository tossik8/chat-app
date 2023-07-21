package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConnectResponse {
    private SentMessage message;
    private SentChat chat;
}
