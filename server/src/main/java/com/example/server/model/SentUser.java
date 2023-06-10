package com.example.server.model;

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
}
