package com.management.gym.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.gym.entity.MealLog;
import com.management.gym.entity.User;
import com.management.gym.repository.MealRepository;
import com.management.gym.repository.UserRepository;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private UserRepository userRepository;
    
    public MealLog saveMeal(Long userId, MealLog mealLog){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        mealLog.setUser(user);
        mealLog.setCreatedAt(java.time.LocalDateTime.now()); 
        return mealRepository.save(mealLog);
    }

    public List<MealLog> getMealsByUser(Long userId) {
        return mealRepository.findByUserId(userId);
    }
}
