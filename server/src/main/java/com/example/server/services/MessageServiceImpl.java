package com.example.server.services;

import com.example.server.entity.ChatEntity;
import com.example.server.entity.MessageEntity;
import com.example.server.entity.UserEntity;
import com.example.server.model.Message;
import com.example.server.model.SentMessage;
import com.example.server.repository.ChatRepository;
import com.example.server.repository.MessageRepository;
import com.example.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MessageServiceImpl implements MessageService{

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    public MessageServiceImpl(UserRepository userRepository, ChatRepository chatRepository, MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }

    @Override
    public MessageEntity saveMessage(Message message) {
        MessageEntity messageEntity = new MessageEntity();
        messageEntity.setSentTime(LocalDateTime.now());
        messageEntity.setText(message.getText());
        Optional<ChatEntity> chatEntity = chatRepository.findById(message.getChatId());
        chatEntity.ifPresent(messageEntity::setChat);
        Optional<UserEntity> userEntity = userRepository.findById(message.getSenderId());
        userEntity.ifPresent(messageEntity::setSender);
        messageRepository.save(messageEntity);
        return messageEntity;
    }

    @Override
    public List<SentMessage> getMessages(long id) {
        List<MessageEntity> messageEntities = messageRepository.findAllByChatIdOrderBySentTime(id);
        List<SentMessage> messages = new LinkedList<>();
        messageEntities.forEach(messageEntity -> messages.add(SentMessage.createSentMessage(messageEntity)));
        return messages;
    }
}
