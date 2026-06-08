package com.management.gym.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.gym.entity.User;
import com.management.gym.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user){
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists";
        }else{
            userRepository.save(user);
            return "User registered successfully";
        }
    }

    public User loginUser(String email,String password){
        User user = userRepository.findByEmail(email);
        if(user == null){
        throw new RuntimeException("User not found");
        }
        if(user.getPassword().equals(password)){
            return user;
        }else{
            throw new RuntimeException("Invalid password");
        }
    }

    public User updateProfile(String email, User updatedUser) {
        User existingUser = userRepository.findByEmail(email);
        if(existingUser == null){
            throw new RuntimeException("User not found");
        }
        existingUser.setAge(updatedUser.getAge());
        existingUser.setGender(updatedUser.getGender());
        existingUser.setWeight(updatedUser.getWeight());
        existingUser.setHeight(updatedUser.getHeight());
        existingUser.setGoal(updatedUser.getGoal());
        existingUser.setExperience(updatedUser.getExperience());
        existingUser.setEmergencyContactName(updatedUser.getEmergencyContactName());
        existingUser.setEmergencyContactPhone(updatedUser.getEmergencyContactPhone());
        existingUser.setAddress(updatedUser.getAddress());

        return userRepository.save(existingUser);
    }

    
}
