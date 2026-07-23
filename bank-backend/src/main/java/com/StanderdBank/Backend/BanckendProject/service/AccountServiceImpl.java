package com.StanderdBank.Backend.BanckendProject.service;

import com.StanderdBank.Backend.BanckendProject.entity.Account;
import com.StanderdBank.Backend.BanckendProject.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl
        implements AccountService {

    @Autowired
    private AccountRepository repository;

    @Override
    public Account createAccount(Account account) {
        return repository.save(account);
    }

    @Override
    public List<Account> getAllAccounts() {
        return repository.findAll();
    }

    @Override
    public Account getAccountById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Account> getAccountsByHolderName(String accountHolderName) {
        return repository.findByAccountHolderName(accountHolderName);
    }
}