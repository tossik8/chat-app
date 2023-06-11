package com.example.server.services;

import com.example.server.model.LoginUser;
import com.example.server.model.RegistrationUser;
import com.example.server.model.SentUser;

public interface UserService {
    SentUser createUser(RegistrationUser user);
    SentUser getUser(LoginUser user);
}
