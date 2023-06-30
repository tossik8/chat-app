package com.example.server.services;

import com.example.server.entity.MessageEntity;
import com.example.server.model.Message;
import com.example.server.model.SentMessage;

import java.util.Set;

public interface MessageService {
    MessageEntity saveMessage(Message message);
    Set<SentMessage> getMessages(long id);
}
