package com.example.server.repository;

import com.example.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUsername(String username);
    Set<UserEntity> findUserEntitiesByChatsIdAndIdNot(long chat_id, long id);
    @Query(value = "SELECT u FROM users u ORDER BY SIMILARITY(u.name || ' ' || u.surname, ?1) DESC, SIMILARITY(u.username, ?1) DESC", nativeQuery = true)
    Set<UserEntity> findUserEntitiesBySimilarity(String key);
}
