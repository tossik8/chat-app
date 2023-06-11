package com.example.server.controller;

import com.example.server.model.LoginUser;
import com.example.server.model.RegistrationUser;
import com.example.server.model.SentUser;
import com.example.server.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }
    @PostMapping("/registration")
    public SentUser createUser(@RequestBody RegistrationUser user){
        return userService.createUser(user);
    }
    @PostMapping("/login")
    public SentUser getUser(@RequestBody LoginUser user){
        return userService.getUser(user);
    }
    @GetMapping("/chats/{id}")
    public List<SentUser> getUserChats(@PathVariable long id, @RequestParam long[] chat_ids){
        return userService.getUserChats(chat_ids, id);
    }
 }
