package com.job_finder.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.job_finder.entity.JobApplication;
import com.job_finder.response.JobDesc;

public interface JobApplicationService {


    List<JobApplication> getAllJobApplications();

    Optional<JobApplication> getJobApplicationById(Long id);

    JobApplication saveJobApplication(JobApplication jobApplication);

    void deleteJobApplication(Long id);

    JobDesc getJobApplicationStatistics();
    
    public void scheduleInterview(Long applicationId, LocalDate interviewDate, String location) ;
}
