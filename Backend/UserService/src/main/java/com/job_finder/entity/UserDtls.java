package com.job_finder.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USER_DTLS")
public class UserDtls {
    @Id
    @Column(name = "Serial_No")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long srno;

    private String fullName;
    private String emailId;
    private String mobileNumber;
    private String password;
    private String description;
    private String workStatus;
    private String accStatus;

    @Lob
    private byte[] resume;

    private boolean employed;
    private String experienceYears;
    private String experienceMonths;
    private String prevCompany;
    private String prevJob;
    private String city;
    private String annualSalary;

    @ElementCollection
    private List<String> qualification;

    private String course;
    private String specialize;
    private String uni;

    @ElementCollection
    private List<String> courseType;

    private String passYear;

    @CreationTimestamp
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(name = "updated_date", insertable = false)
    private LocalDateTime updatedDate;
    
}
