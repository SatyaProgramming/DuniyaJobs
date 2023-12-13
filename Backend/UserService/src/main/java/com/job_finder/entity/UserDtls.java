package com.job_finder.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="USER_DTLS")
public class UserDtls {
	@Id
	 @Column(name = "Serial_No")
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Long srno;
    private String fullName;
    private String emailId;
    private String mobileNumber;
    private String username;
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
    
    
   
}
