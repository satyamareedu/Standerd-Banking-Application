package com.StanderdBank.Backend.BanckendProject.repository;


import com.StanderdBank.Backend.BanckendProject.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface AccountRepository
        extends JpaRepository<Account, Long> {

    List<Account> findByAccountHolderName(String accountHolderName);

}
