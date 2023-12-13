package com.job_finder.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.job_finder.entity.JobEntity;
import com.job_finder.repository.JobRepository;
import com.job_finder.service.JobsService;
@Service
public class JobServiceImpl implements JobsService {
	
	@Autowired
	private JobRepository jobRepository;

	 public List<JobEntity> getAllJobs(int page, int size) {
	        Sort sort = Sort.by("createdDate").descending();
	        Pageable pageable = PageRequest.of(page, size, sort);
	        Page<JobEntity> jobsPage = jobRepository.findAll(pageable);
	        List<JobEntity> jobsList = jobsPage.getContent();
	        return jobsList;
	    }

	@Override
	public Optional<JobEntity> getJobById(Long id) {
		return jobRepository.findById(id);
	}

	@Override
	public JobEntity saveJob(JobEntity job) {
		return jobRepository.save(job);
	}

	@Override
	public void deleteJob(Long id) {
		jobRepository.deleteById(id);
	}
}
