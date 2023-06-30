package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SentMessage {
    private String text;
    private LocalDateTime time;
    private SentUser sender;
}
