package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
public class SentChat {
    private long id;
    private String name;
    private Set<SentUser> connectedUsers;
    private List<SentMessage> messages;
}
