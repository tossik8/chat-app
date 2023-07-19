package com.example.server.services;

import com.example.server.entity.MessageEntity;
import com.example.server.model.Message;
import com.example.server.model.SentMessage;

import java.util.List;

public interface MessageService {
    SentMessage saveMessage(Message message);
    List<SentMessage> getMessages(long id);
}
