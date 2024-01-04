package com.job_finder.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.job_finder.entity.JobApplication;
import com.job_finder.repository.JobApplicationRepository;
import com.job_finder.response.JobDesc;
import com.job_finder.service.JobApplicationService;

public class JobApplicationServiceImpl implements JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Override
    public List<JobApplication> getAllJobApplications() {
        return jobApplicationRepository.findAll();
    }

    @Override
    public Optional<JobApplication> getJobApplicationById(Long id) {
        return jobApplicationRepository.findById(id);
    }

    @Override
    public JobApplication saveJobApplication(JobApplication jobApplication) {
        return jobApplicationRepository.save(jobApplication);
    }

    @Override
    public void deleteJobApplication(Long id) {
        jobApplicationRepository.deleteById(id);
    }

    @Override
    public JobDesc getJobApplicationStatistics() {
        JobDesc desc = new JobDesc();
        List<JobApplication> jobApplications = jobApplicationRepository.findAll();

        // Set the statistics based on the retrieved job applications
        desc.setJobposts(jobApplications.size());
        // Add more statistics as needed

        return desc;
    }
    
    @Override
    public void scheduleInterview(Long applicationId, LocalDate interviewDate, String location) {
        Optional<JobApplication> optionalApplication = jobApplicationRepository.findById(applicationId);
        optionalApplication.ifPresent(application -> {
            application.setInterviewDate(interviewDate);
            application.setInterviewLocation(location);
            application.setStatus("Scheduled");
            jobApplicationRepository.save(application);
        });
    }
}