package com.job_finder.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.job_finder.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long>{

	Company findByContactEmail(String contactEmail);


	Optional<Company> findOneByContactEmailAndPassword(String contactEmail, String encodedPassword);


	Company findOneByContactEmail(String email);

	
}
