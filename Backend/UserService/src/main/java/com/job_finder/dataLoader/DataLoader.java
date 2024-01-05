package com.job_finder.dataLoader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;

import com.job_finder.repository.UserRepository;

public class DataLoader implements ApplicationRunner{

	@Autowired
	private UserRepository ur;
	@Override
	public void run(ApplicationArguments args) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
