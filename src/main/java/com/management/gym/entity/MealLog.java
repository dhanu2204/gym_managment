package com.management.gym.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String foodName;
    private int calories;
    private int protein;
    private int carbs;
    private int fats;
    private int sugar;

    @Column(columnDefinition = "TEXT")
    private String cons;

    @Column(columnDefinition = "TEXT")
    private String weeklyLimit;

    @Column(columnDefinition = "TEXT")
    private String hormonalImpact;

    private LocalDateTime createdAt = LocalDateTime.now();

}
