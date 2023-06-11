package com.example.server.repository;

import com.example.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUsername(String username);
    @Query("SELECT u from UserEntity u JOIN u.chats c WHERE c.id IN ?1 AND u.id <> ?2")
    List<UserEntity> findByChatIds(long[] chat_ids, long id);
}
