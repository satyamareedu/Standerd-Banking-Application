package com.StanderdBank.Backend.BanckendProject.controller;

import com.StanderdBank.Backend.BanckendProject.dto.LoginRequest;
import com.StanderdBank.Backend.BanckendProject.entity.User;
import com.StanderdBank.Backend.BanckendProject.service.EmailService;
import com.StanderdBank.Backend.BanckendProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;
    @GetMapping("/email")
    public String testEmail() {

                emailService.sendOtp(
                        "satyamareedu7@gmail.com",
                        "123456"
                );


        return "Email Sent Successfully";
    }

}
