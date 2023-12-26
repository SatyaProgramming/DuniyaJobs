package com.job_finder.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.job_finder.entity.JobApplication;
import com.job_finder.entity.JobEntity;
import com.job_finder.repository.JobApplicationRepository;
import com.job_finder.repository.JobRepository;
import com.job_finder.response.JobDesc;
import com.job_finder.search.JobSearchCriteria;
import com.job_finder.service.JobsService;

@Service
public class JobServiceImpl implements JobsService {

	@Autowired
	private JobApplicationRepository jobApplicationRepository;

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
	public List<JobEntity> searchJobs(JobSearchCriteria searchCriteria) {
	    JobEntity jobEntity = new JobEntity();
	    
	    if (searchCriteria.getSkills() != null && !searchCriteria.getSkills().isEmpty()) {
	        jobEntity.setDescription(searchCriteria.getSkills());
	        jobEntity.setTitle(searchCriteria.getSkills());
	    }
	   
	    if (searchCriteria.getExperience() != null && !searchCriteria.getExperience().isEmpty()) {
	        jobEntity.setExperience(searchCriteria.getExperience());
	    }

	    ExampleMatcher matcher = ExampleMatcher.matching()
	            .withIgnoreCase()
	            .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);

	    Example<JobEntity> example = Example.of(jobEntity, matcher);

	    Pageable pageable = PageRequest.of(0, 10); // Adjust as needed
	    Page<JobEntity> jobPage = jobRepository.findAll(example, pageable);

	    return jobPage.getContent();
	}


	

	@Override
	public Optional<JobEntity> getJobById(Long id) {
		Optional<JobEntity> job = jobRepository.findById(id);
		job.ifPresent(j -> {
			j.setViews(j.getViews() + 1); // Increment views when retrieving the job
			jobRepository.save(j); // Save the updated job entity
		});
		return job;
	}

	@Override
	public JobEntity saveJob(JobEntity job) {
		return jobRepository.save(job);
	}

	@Override
	public void deleteJob(Long id) {
		jobRepository.deleteById(id);
	}

//	under working progress...................................
	@Override
	public JobDesc getJobDesc() {
		JobDesc desc = new JobDesc();

		List<JobEntity> jobs = jobRepository.findAll();
		List<JobApplication> jobApplications = jobApplicationRepository.findAll();
		List<JobEntity> jobslist = jobRepository.findAll();

		int totalJobPosts = 0;
		int totalViews = 0;

		if (jobs != null) {
			totalJobPosts += jobs.size();
		}

		if (jobApplications != null) {
			totalJobPosts += jobApplications.size();
		}

		if (jobslist != null) {
			totalJobPosts += jobslist.size();
			totalViews = jobslist.stream().filter(jobEntity -> jobEntity != null && jobEntity.getViews() != null)
					.mapToInt(JobEntity::getViews).sum();
		}

		desc.setJobposts(totalJobPosts);
		desc.setJobview(totalViews);

		return desc;
	}

}
