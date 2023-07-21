package com.example.server.services;

import com.example.server.model.ConnectRequest;
import com.example.server.model.SentChat;

public interface ChatService {
    SentChat saveChat(ConnectRequest connectRequest);
}
