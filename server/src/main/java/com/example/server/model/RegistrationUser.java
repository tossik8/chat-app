package com.example.server.model;

import lombok.Data;

@Data
public class RegistrationUser {
    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;
}
