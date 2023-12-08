package com.job_finder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Employer")
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String CompanyName;
	private String password;
	private String location;
	private String contactEmail;
	private String contactPhone;
	private String description;
	private String industry;
	private String AccStatus;
	
	
}
