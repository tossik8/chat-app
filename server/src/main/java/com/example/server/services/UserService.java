package com.example.server.services;

import com.example.server.model.LoginUser;
import com.example.server.model.RegistrationUser;
import com.example.server.model.SentUser;

import java.util.List;

public interface UserService {
    SentUser createUser(RegistrationUser user);
    SentUser getUser(LoginUser user);
    List<SentUser> getUserChats(long[] chat_ids, long id);
}
