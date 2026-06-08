package com.management.gym.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private Integer age;
    private String gender;
    private Double weight;
    private Double height;
    private String address;
    private String goal;
    private String experience;

}
