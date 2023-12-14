package com.job_finder.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Job_Application")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appid;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id")
    private JobEntity job;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserDtls user;

    @CreationTimestamp
    private LocalDate applicationDate;

    private String status; // e.g., "Pending", "Accepted", "Rejected"
    
    private LocalDate interviewDate; // New field for interview date
    private String interviewLocation;
}
