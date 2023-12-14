package com.job_finder.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Job")
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id") // Adjust column name if needed
    private Long id;

    private String title;
    private String description;
    private String location;

    @ManyToOne
    @JoinColumn(name = "companyId")
    private Company company;

    private String experience;
    @CreationTimestamp
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(name = "updated_date", insertable = false)
    private LocalDateTime updatedDate;

    private String requirements;
    
    private Integer views;
}
