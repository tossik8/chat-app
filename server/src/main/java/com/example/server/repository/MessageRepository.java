package com.example.server.repository;

import com.example.server.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    Set<MessageEntity> findAllByChatId(long id);
}
