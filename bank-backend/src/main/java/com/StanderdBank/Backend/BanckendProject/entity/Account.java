package com.StanderdBank.Backend.BanckendProject.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @NotBlank(message = "Account Holder Name is required")
    @Column(nullable = false)
    private String accountHolderName;

    @NotBlank(message = "Account Type is required")
    @Column(nullable = false)
    private String accountType;

    @NotBlank(message = "Currency is required")
    @Column(nullable = false)
    private String currency;

    @NotNull(message = "Initial Deposit is required")
    @Positive(message = "Initial Deposit must be greater than 0")
    @Min(value = 1000, message = "Minimum deposit should be 1000")
    private Double initialDeposit;

    @NotBlank(message = "Source of Funds is required")
    @Column(nullable = false)
    private String sourceOfFunds;

    @NotBlank(message = "Purpose is required")
    @Column(nullable = false)
    private String purpose;

    // Default Constructor
    public Account() {
    }

    // Parameterized Constructor
    public Account(Long accountId, String accountHolderName,
                   String accountType, String currency,
                   Double initialDeposit,
                   String sourceOfFunds,
                   String purpose) {
        this.accountId = accountId;
        this.accountHolderName = accountHolderName;
        this.accountType = accountType;
        this.currency = currency;
        this.initialDeposit = initialDeposit;
        this.sourceOfFunds = sourceOfFunds;
        this.purpose = purpose;
    }

    // Getters and Setters

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Double getInitialDeposit() {
        return initialDeposit;
    }

    public void setInitialDeposit(Double initialDeposit) {
        this.initialDeposit = initialDeposit;
    }

    public String getSourceOfFunds() {
        return sourceOfFunds;
    }

    public void setSourceOfFunds(String sourceOfFunds) {
        this.sourceOfFunds = sourceOfFunds;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
}