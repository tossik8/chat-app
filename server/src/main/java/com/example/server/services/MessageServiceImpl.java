package com.example.server.services;

import com.example.server.entity.ChatEntity;
import com.example.server.entity.MessageEntity;
import com.example.server.entity.UserEntity;
import com.example.server.model.Message;
import com.example.server.model.SentMessage;
import com.example.server.model.SentUser;
import com.example.server.repository.ChatRepository;
import com.example.server.repository.MessageRepository;
import com.example.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

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
    public SentMessage createSentMessage(MessageEntity messageEntity) {
        return new SentMessage(messageEntity.getText(), messageEntity.getSentTime(), SentUser.createSentUser(messageEntity.getSender()));
    }
}
