package com.job_finder.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.job_finder.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);

	Admin findByEmailId(String email);

	Optional<Admin> findOneByEmailIdAndPassword(String email, String encodedPassword);
}