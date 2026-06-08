package com.management.gym.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.management.gym.entity.MealLog;
import com.management.gym.service.MealService;

@RestController
@RequestMapping("/api/meal")
@CrossOrigin(origins = "*")
public class MealController {

    @Autowired
    private MealService mealService;

    @PostMapping("/add/{userId}")
    public ResponseEntity<MealLog> addMeal(@PathVariable Long userId, @RequestBody MealLog mealLog) {
        MealLog savedMeal = mealService.saveMeal(userId, mealLog);
        return ResponseEntity.ok(savedMeal);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MealLog>> getMealsByUser(@PathVariable Long userId) {
        List<MealLog> meals = mealService.getMealsByUser(userId);
        return ResponseEntity.ok(meals);
    }

}
