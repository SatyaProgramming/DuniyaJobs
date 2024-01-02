package com.job_finder.entity;

import lombok.Data;

import java.util.List;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Employer")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String companyName; // Adjust field name if needed
    private String password;
    private String location;
    private String contactEmail;
    private String contactPhone;
    private String description;
    private String industry;
    private String status;
    private String accStatus; 
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<JobEntity> jobs;

}
