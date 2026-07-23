package com.StanderdBank.Backend.BanckendProject.controller;

import java.util.List;
import java.util.Map;

import com.StanderdBank.Backend.BanckendProject.dto.LoginRequest;
import com.StanderdBank.Backend.BanckendProject.dto.OtpRequest;
import com.StanderdBank.Backend.BanckendProject.entity.User;
import com.StanderdBank.Backend.BanckendProject.service.UserService;
import jakarta.validation.Valid;
import com.StanderdBank.Backend.BanckendProject.dto.ResetPasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // Register User
    @PostMapping("/register")
    public User registerUser(
            @Valid @RequestBody User user) {

        return userService.registerUser(user);
    }

    // Login User
//    @PostMapping("/login")
//    public User login(
//            @RequestBody LoginRequest request) {
//
//        return userService.login(
//                request.getUsername(),
//                request.getPassword());
//    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
   try {
       User user = userService.login(
               request.getUsername(),
               request.getPassword());

       if (user == null) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                   .body(Map.of(
                           "message", "Invalid Username or Password"
                   ));
       }

       return ResponseEntity.ok(Map.of(
               "message", "Login Successful",
               "user", user
       ));
   }catch (RuntimeException e)
   {
       return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
   }
    }
    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }

    // Get User By Id
    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id) {

        return userService.getUserById(id);
    }

    // Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return "User Deleted Successfully";
    }

    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestBody ResetPasswordRequest request) {

        userService.resetPassword(
                request.getIdentifier(),
                request.getNewPassword());

        return "Password Updated Successfully";
    }

    @GetMapping("/forgot-username")
    public String forgotUsername(
            @RequestParam String email) {

        return userService.getUsernameByEmail(email);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody OtpRequest request) {

        return userService.verifyOtp(
                request.getUsername(),
                request.getOtp()
        );
    }

    @PostMapping("/resend-otp")
    public String resendOtp(@RequestParam String username){

        return userService.resendOtp(username);
    }

}