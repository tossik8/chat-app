package com.example.server.model;

import com.example.server.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class SentUser {
    private long id;
    private String name;
    private String surname;
    private String username;
    private String email;

    public static SentUser createSentUser(UserEntity user){
        return new SentUser(user.getId(),
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getEmail());
    }
}
