package com.example.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "chats")
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chat_id;
    @ManyToMany(mappedBy = "chats")
    private Set<UserEntity> users;
}
