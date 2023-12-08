package com.job_finder.service;

import java.util.List;
import java.util.Optional;

import com.job_finder.entity.JobEntity;

public interface JobsService {

	 List<JobEntity> getAllJobs(int page, int size);


	public Optional<JobEntity> getJobById(Long id);

	
	public JobEntity saveJob(JobEntity job);


	public void deleteJob(Long id);
}
