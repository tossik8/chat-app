package com.example.server.services;

import com.example.server.entity.ChatEntity;
import com.example.server.entity.UserEntity;
import com.example.server.model.ConnectRequest;
import com.example.server.model.SentChat;
import com.example.server.model.SentUser;
import com.example.server.repository.ChatRepository;
import com.example.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public ChatServiceImpl(ChatRepository chatRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    @Override
    public SentChat saveChat(ConnectRequest connectRequest) {
        ChatEntity chatEntity = new ChatEntity();
        chatRepository.save(chatEntity);
        Set<SentUser> connectedUsers = new HashSet<>();
        Optional<UserEntity> senderEntity = userRepository.findById(connectRequest.getSenderId());
        senderEntity.ifPresent(sender -> {
            sender.getChats().add(chatEntity);
            userRepository.save(sender);
            connectedUsers.add(SentUser.createSentUser(sender));
        });
        Optional<UserEntity> receiverEntity = userRepository.findById(connectRequest.getReceiverId());
        receiverEntity.ifPresent(receiver -> {
            receiver.getChats().add(chatEntity);
            userRepository.save(receiver);
            connectedUsers.add(SentUser.createSentUser(receiver));
        });
        return new SentChat(chatEntity.getId(), null, connectedUsers);
    }
}
