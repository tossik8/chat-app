package com.example.server.services;

import com.example.server.entity.UserEntity;
import com.example.server.model.LoginUser;
import com.example.server.model.RegistrationUser;
import com.example.server.model.SentUser;
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
    public SentUser createUser(RegistrationUser user){
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);
        String encodedPassword = this.passwordEncoder.encode(userEntity.getPassword());
        userEntity.setPassword(encodedPassword);
        userRepository.save(userEntity);
        return createSentUser(userEntity);
    }
    @Override
    public SentUser getUser(LoginUser user){
        Optional<UserEntity> userEntity = userRepository.findByEmail(user.getEmail());
        if(userEntity.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        if(!passwordEncoder.matches(user.getPassword(), userEntity.get().getPassword())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");
        }
        return createSentUser(userEntity.get());
    }

    private SentUser createSentUser(UserEntity user){
        return new SentUser(user.getId(),
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getEmail());
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
