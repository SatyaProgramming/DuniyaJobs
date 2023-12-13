package com.job_finder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.job_finder.entity.JobEntity;

public interface JobRepository extends JpaRepository<JobEntity, Long>{

}
