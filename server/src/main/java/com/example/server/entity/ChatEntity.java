package com.example.server.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "chats")
public class ChatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
}
