package com.example.server.model;

import com.example.server.entity.MessageEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SentMessage {
    private String text;
    private LocalDateTime time;
    private SentUser sender;
    public static SentMessage createSentMessage(MessageEntity message){
        return new SentMessage(message.getText(), message.getSentTime(), SentUser.createSentUser(message.getSender()));
    }
}
