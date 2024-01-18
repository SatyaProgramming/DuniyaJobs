package com.job_finder.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.job_finder.entity.UserDtls;

public interface UserRepository extends JpaRepository<UserDtls, Long>{

	UserDtls findByEmailId(String email);


    Optional<UserDtls> findOneByEmailIdAndPassword(String email, String password);


	UserDtls findBySrno(Long srno);


	UserDtls findBySrno(long srno);


	Optional<UserDtls> findByImgName(String fileName);


	

}
