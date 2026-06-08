package com.management.gym.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.management.gym.entity.MealLog;

@Repository
public interface MealRepository extends JpaRepository<MealLog,Long>{

    List<MealLog> findByUserId(Long userId);
}
