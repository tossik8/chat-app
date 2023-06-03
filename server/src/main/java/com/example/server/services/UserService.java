package com.example.server.services;

import com.example.server.entity.UserEntity;
import com.example.server.model.User;

public interface UserService {
    User createUser(User user);
    UserEntity getUser(User user);
    boolean checkEmail(String email);
    boolean checkUsername(String username);
}
