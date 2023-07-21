package com.example.server.model;

import com.example.server.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
public class SentUser {
    private long id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private Set<SentChat> chats;
    public static SentUser createSentUser(UserEntity user){
        return new SentUser(user.getId(),
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getEmail(),
                new HashSet<>() );
    }
}
