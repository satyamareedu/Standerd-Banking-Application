package com.StanderdBank.Backend.BanckendProject.controller;

import java.util.List;

import com.StanderdBank.Backend.BanckendProject.entity.Account;
import com.StanderdBank.Backend.BanckendProject.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin("*")
public class AccountController {

    @Autowired
    private AccountService service;

    @PostMapping
    public Account createAccount(@Valid
            @RequestBody Account account) {

        return service.createAccount(account);
    }

    @GetMapping("/{id}")
    public Account getAccountById(
            @PathVariable Long id) {

        return service.getAccountById(id);
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return service.getAllAccounts();
    }

    @GetMapping("/user/{name}")
    public List<Account> getAccountsByUser(
            @PathVariable String name) {

        return service.getAccountsByHolderName(name);
    }
}
