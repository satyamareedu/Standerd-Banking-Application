package com.StanderdBank.Backend.BanckendProject.service;

import java.util.List;

import com.StanderdBank.Backend.BanckendProject.entity.Account;
import com.StanderdBank.Backend.BanckendProject.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public interface AccountService {

    Account createAccount(Account account);

    List<Account> getAllAccounts();

    Account getAccountById(Long id);

    List<Account> getAccountsByHolderName(String accountHolderName);
}