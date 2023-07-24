package com.example.server.services;

import com.example.server.model.ConnectRequest;
import com.example.server.model.SentChat;

import java.util.Set;

public interface ChatService {
    SentChat saveChat(ConnectRequest connectRequest);

    Set<SentChat> getChats(long id);
}
