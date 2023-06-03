package com.example.server.services;

import com.example.server.entity.UserEntity;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public User createUser(User user){
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);
        String encodedPassword = this.passwordEncoder.encode(userEntity.getPassword());
        userEntity.setPassword(encodedPassword);
        userRepository.save(userEntity);
        return user;
    }
    @Override
    public UserEntity getUser(User user){
        Optional<UserEntity> userEntity = userRepository.findByEmail(user.getEmail());
        if(userEntity.isPresent()){
            if(passwordEncoder.matches(user.getPassword(), userEntity.get().getPassword())){
                return userEntity.get();
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @Override
    public boolean checkEmail(String email){
        return isEmailUnique(email);
    }
    @Override
    public boolean checkUsername(String username){
        return isUsernameUnique(username);
    }
    private boolean isEmailUnique(String email){
        return userRepository.findByEmail(email).isEmpty();
    }
    private boolean isUsernameUnique(String username){
        return userRepository.findByUsername(username).isEmpty();
    }
}
