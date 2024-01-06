package com.job_finder.helperClass;

import lombok.Data;

@Data
public class CompanyDTO {
    private Long id;
    private String companyName;
    private String location;
    private String contactEmail;
    private String contactPhone;
    private String description;
    private String industry;
    private String accStatus;
    // Other fields...

    // Omitting the jobs field to keep it simple for demonstration purposes
}
