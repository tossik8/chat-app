package com.example.server.services;

import com.example.server.model.LoginUser;
import com.example.server.model.RegistrationUser;
import com.example.server.model.SentUser;

import java.util.List;


public interface UserService {
    SentUser createUser(RegistrationUser user);
    SentUser logInUser(LoginUser user);
    List<SentUser> getUsers(String key);
}
