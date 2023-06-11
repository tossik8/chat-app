package com.example.server.services;

import com.example.server.entity.UserEntity;
import com.example.server.model.LoginUser;
import com.example.server.model.RegistrationUser;
import com.example.server.model.SentUser;
import com.example.server.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
        ResponseEntity<String> response = verifyRegistrationForm(user);
        if(response.getStatusCode().value() == 200){
            UserEntity userEntity = new UserEntity();
            BeanUtils.copyProperties(user, userEntity);
            String encodedPassword = this.passwordEncoder.encode(userEntity.getPassword());
            userEntity.setPassword(encodedPassword);
            userRepository.save(userEntity);
            return createSentUser(userEntity);
        }
        throw new ResponseStatusException(HttpStatusCode.valueOf(response.getStatusCode().value()), response.getBody());
    }
    @Override
    public SentUser getUser(LoginUser user){
        ResponseEntity<String> response = verifyLoginForm(user);
        if(response.getStatusCode().value() == 200){
            Optional<UserEntity> userEntity = userRepository.findByEmail(user.getEmail());
            if(userEntity.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
            }
            if(!passwordEncoder.matches(user.getPassword(), userEntity.get().getPassword())){
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");
            }
            return createSentUser(userEntity.get());
        }
        throw new ResponseStatusException(HttpStatusCode.valueOf(response.getStatusCode().value()), response.getBody());
    }

    private SentUser createSentUser(UserEntity user){
        return new SentUser(user.getId(),
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getEmail(),
                user.getChats());
    }
    private ResponseEntity<String> verifyRegistrationForm(RegistrationUser user){
        if(hasMissingValues(user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword())){
            return new ResponseEntity<>("All fields must be filled", HttpStatus.UNAUTHORIZED);
        }
        if(!user.getEmail().matches("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")){
            return new ResponseEntity<>("The email is invalid", HttpStatus.UNAUTHORIZED);
        }
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return new ResponseEntity<>("The email is already registered", HttpStatus.UNAUTHORIZED);
        }
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            return new ResponseEntity<>("The username is already in use", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    private ResponseEntity<String> verifyLoginForm(LoginUser user){
        if(hasMissingValues(user.getEmail(), user.getPassword())){
            return new ResponseEntity<>("All fields must be filled", HttpStatus.UNAUTHORIZED);
        }
        if(!user.getEmail().matches("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")){
            return new ResponseEntity<>("The email is invalid", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    public boolean hasMissingValues(String ...fields){
        for(String field : fields){
            if(field == null || field.isBlank()){
                return true;
            }
        }
        return false;
    }
}
