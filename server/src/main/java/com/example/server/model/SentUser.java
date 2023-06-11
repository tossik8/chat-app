package com.example.server.model;

import com.example.server.entity.ChatEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class SentUser {
    private long id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private Set<ChatEntity> chats;
    private Set<SentUser> connectedUsers;
}
