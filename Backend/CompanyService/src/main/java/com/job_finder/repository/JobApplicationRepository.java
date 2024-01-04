package com.job_finder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.job_finder.entity.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long>{

}
