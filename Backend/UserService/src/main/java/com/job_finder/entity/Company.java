package com.job_finder.entity;

import lombok.Data;
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
    private String accStatus; // Adjust field name if needed
}
