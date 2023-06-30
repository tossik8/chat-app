package com.example.server.services;

import com.example.server.entity.MessageEntity;
import com.example.server.model.Message;
import com.example.server.model.SentMessage;

public interface MessageService {
    MessageEntity saveMessage(Message message);
    SentMessage createSentMessage(MessageEntity messageEntity);
}
