package com.job_finder.repository;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

import com.job_finder.entity.JobEntity;

public interface JobRepository extends JpaRepository<JobEntity, Long>, QueryByExampleExecutor<JobEntity> {

    @Override
    <S extends JobEntity> Page<S> findAll(Example<S> example, Pageable pageable);
}
