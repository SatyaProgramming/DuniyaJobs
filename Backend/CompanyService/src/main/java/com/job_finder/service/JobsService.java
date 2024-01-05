package com.job_finder.service;

import java.util.List;
import java.util.Optional;

import com.job_finder.entity.JobEntity;
import com.job_finder.response.JobDesc;
import com.job_finder.search.JobSearchCriteria;

public interface JobsService {

	 List<JobEntity> getAllJobs(int page, int size);


	public Optional<JobEntity> getJobById(Long id);

	
	public JobEntity saveJob(JobEntity job);


	public void deleteJob(Long id);


	JobDesc getJobDesc();


	List<JobEntity> searchJobs(JobSearchCriteria searchCriteria);
}
