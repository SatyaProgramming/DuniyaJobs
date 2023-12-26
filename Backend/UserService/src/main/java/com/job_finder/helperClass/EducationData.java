package com.job_finder.helperClass;

import java.util.List;

import lombok.Data;

@Data
public class EducationData {

	private Long srno;
    private List<String> qualification;
    private String course;
    private String specialize;
    private String uni;
    private List<String> courseType;
    private String passYear;
}
