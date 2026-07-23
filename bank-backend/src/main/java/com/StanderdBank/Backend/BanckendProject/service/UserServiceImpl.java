package com.StanderdBank.Backend.BanckendProject.service;

import java.time.LocalDateTime;
import java.util.List;

import com.StanderdBank.Backend.BanckendProject.OtpGenerator;
import com.StanderdBank.Backend.BanckendProject.entity.User;
import com.StanderdBank.Backend.BanckendProject.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
// org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public User registerUser(User user) {

        System.out.println("Original Password = " + user.getPassword());
        if(userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if(userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("Encoded Password = " + user.getPassword());



        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    @Override
    public User login(String username, String password) {

        System.out.println("Entered Username = " + username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Invalid Username"));

        // Compare entered password with encrypted password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String otp = OtpGenerator.generateOtp();

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        User savedUser = userRepository.save(user);
        userRepository.save(user);
        emailService.sendOtp(savedUser.getEmail(), otp);

        return savedUser;
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        userRepository.delete(user);
    }

    @Override
    public void resetPassword(
            String identifier,
            String newPassword) {

        User user = userRepository.findByUsername(identifier)
                .orElse(
                        userRepository.findByEmail(identifier)
                                .orElse(null)
                );

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

       // user.setPassword(newPassword);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }


    @Override
    public String getUsernameByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Email not found"));

        return user.getUsername();
    }

    @Override
    public String verifyOtp(String username, String otp) {

        System.out.println("Username from request = " + username);
        System.out.println("OTP entered = " + otp);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("OTP in DB = " + user.getOtp());

        if (user.getOtp() == null) {
            throw new RuntimeException("OTP not generated");
        }

        if (!user.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }

        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        return "OTP Verified Successfully";
    }

    @Override
    public String resendOtp(String username){

        User user=userRepository.findByUsername(username)
                .orElseThrow(()->new RuntimeException("User Not Found"));

        String otp=OtpGenerator.generateOtp();

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);

        emailService.sendOtp(user.getEmail(),otp);

        return "OTP Sent Successfully";
    }

}