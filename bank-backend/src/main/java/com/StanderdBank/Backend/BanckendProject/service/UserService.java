package com.StanderdBank.Backend.BanckendProject.service;

import com.StanderdBank.Backend.BanckendProject.entity.User;

import java.util.List;



public interface UserService {

    User registerUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User login(String username, String password);

    void deleteUser(Long id);
    void resetPassword(
            String identifier,
            String newPassword);

    String getUsernameByEmail(String email);

    String verifyOtp(String username, String otp);

    String resendOtp(String username);
}