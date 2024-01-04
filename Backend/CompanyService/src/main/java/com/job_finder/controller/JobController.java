package com.job_finder.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.job_finder.entity.JobEntity;
import com.job_finder.response.JobDesc;
import com.job_finder.search.JobSearchCriteria;
import com.job_finder.service.JobsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {
	
	@Autowired
	private JobsService jobService;

//	@GetMapping("/get-job-list")
//	public ResponseEntity<List<JobEntity>> getAllJobs() {
//		List<JobEntity> jobs = jobService.getAllJobs();
//		return new ResponseEntity<>(jobs, HttpStatus.OK);
//	}
	
	@GetMapping("/get-job-list")
	public ResponseEntity<List<JobEntity>> getAllJobs(
	    @RequestParam(defaultValue = "0") int page,
	    @RequestParam(defaultValue = "10") int size
	) {
	    List<JobEntity> jobsList = jobService.getAllJobs(page, size);
	    return new ResponseEntity<>(jobsList, HttpStatus.OK);
	}
	
	@PostMapping("/search")
	public ResponseEntity<List<JobEntity>> searchJobs(@RequestBody JobSearchCriteria searchCriteria) {
	    List<JobEntity> jobsList = jobService.searchJobs(searchCriteria);
	    return new ResponseEntity<>(jobsList, HttpStatus.OK);
	}
	
	
	@GetMapping("/get-job/{id}")
	public ResponseEntity<JobEntity> getJobById(@PathVariable Long id) {
		Optional<JobEntity> job = jobService.getJobById(id);
		return job.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping("/save-job")
	public ResponseEntity<JobEntity> saveJob(@RequestBody JobEntity job) {
		JobEntity savedJob = jobService.saveJob(job);
		return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
	}
	@GetMapping("dashboard-data")
	public ResponseEntity<JobDesc> getJobDesc(){
		return new ResponseEntity<>(jobService.getJobDesc(),HttpStatus.ACCEPTED);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
		jobService.deleteJob(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
