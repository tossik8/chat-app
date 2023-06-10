package com.example.server.controller;

import com.example.server.entity.UserEntity;
import com.example.server.model.LoginUser;
import com.example.server.model.RegistrationUser;
import com.example.server.model.SentUser;
import com.example.server.services.UserService;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/email/{email}")
    public boolean checkEmail(@PathVariable(value="email") String email){
        return userService.checkEmail(email);
    }
    @GetMapping("/username/{username}")
    public boolean checkUsername(@PathVariable(value="username") String username){
        return userService.checkUsername(username);
    }
}
