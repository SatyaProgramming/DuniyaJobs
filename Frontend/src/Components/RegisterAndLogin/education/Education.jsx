// import NavbarRegister from "../NavAndFooter/NavbarRegister";
import FooterRegister from "../NavAndFooter/FooterRegister";
import style from "./Education.module.css";
import React, { useState } from "react";
import axios from "axios";

import Navbar from '../../HomePageNavbar/Navbar';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Checkbox,
  Button
} from "@chakra-ui/react";
 import { useNavigate } from "react-router-dom";


const Education = () => {
  const navigate=useNavigate();
  const [educationData, setEducationData] = useState({
    srno: 102,
    qualification: [],
    course: "",
    specialize: "",
    uni: "",
    courseType: [],
    passYear: "2023",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedCourseType = checked
        ? [...educationData.courseType, value]
        : educationData.courseType.filter((type) => type !== value);

      setEducationData({
        ...educationData,
        courseType: updatedCourseType,
      });
    } else {
      setEducationData({
        ...educationData,
        [name]: value,
      });
    }
  };

  const handleQualificationChange = (qualification) => {
    setEducationData((prevData) => ({
      ...prevData,
      qualification: prevData.qualification.includes(qualification)
        ? prevData.qualification.filter((q) => q !== qualification)
        : [...prevData.qualification, qualification],
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (educationData.qualification.length === 0) {
      errors.qualification = "Please select at least one qualification";
    }
    if (!educationData.course) {
      errors.course = "Course is required";
    }
    if (!educationData.uni) {
      errors.uni = "University/Institute is required";
    }
    if (!educationData.specialize) {
      errors.specialize = "Specialization is required";
    }
    if (
      !educationData.passYear ||
      isNaN(educationData.passYear) ||
      educationData.passYear < 1900 ||
      educationData.passYear > new Date().getFullYear()
    ) {
      errors.passYear = "Please enter a valid passing year";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveEducationData = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await axios.post("http://localhost:8081/education-save", educationData);
      if (response.status === 200) {
        navigate("/home");
        alert('Your data was successfully submitted.');
      }
      console.log("Education data saved successfully");
      // You may navigate to the next page or perform other actions here
    } catch (error) {
      console.error("Error saving education data:", error.message);
      alert('There was an error submitting your data.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Navbar />
    <div>
      <div className={style.EducationPanes}>
        <Box className={style.EducationPanesUpper}>
          <Text fontSize="2xl">Education</Text>
          <Text>Employers prefer to</Text>
          <Text>know about your education</Text>
        </Box>
        <Box className={style.rightEducationBox}>
          <Heading size="lg">Mention your Education</Heading>
          <Text fontSize="md" mb="5">
            Adding education details will help recruiters know your value as a
            potential candidate
          </Text>
          <FormControl
            className={style.rightEducationForm}
            isInvalid={!!errors.course || !!errors.uni || !!errors.passYear}
          >
          <div className={style.rightEducationFormDiv}>
            <div>
              <FormLabel>Highest Qualification</FormLabel>
              <Stack spacing={5} direction="row">
                <Checkbox
                  type="checkbox"
                  onChange={() => handleQualificationChange("Graduation/Diploma")}
                >
                  <FormLabel>Graduation/Diploma</FormLabel>
                </Checkbox>
                <Checkbox
                  type="checkbox"
                  onChange={() => handleQualificationChange("Masters")}
                >

                  <FormLabel>Masters</FormLabel>
                </Checkbox>
                <Checkbox
                  type="checkbox"
                  onChange={() => handleQualificationChange("High School")}
                >
                  <FormLabel>High School</FormLabel>
                </Checkbox>
                {errors.qualification && (
                  <div style={{ color: "red" }}>{errors.qualification}</div>
                )}
              </Stack>
            </div>

            <div>
              <FormLabel>Course</FormLabel>
              <Input
                type="text"
                placeholder="Eg. BSc"
                onChange={handleChange}
                name="course"
              />
              {errors.course && <div style={{ color: "red" }}>{errors.course}</div>}
            </div>

            <div>
              <FormLabel>Specialization</FormLabel>
              <Input
                type="text"
                placeholder="Eg. Electronics"
                onChange={handleChange}
                name="specialize"
              />
              {errors.specialize && (
                <div style={{ color: "red" }}>{errors.specialize}</div>
              )}
            </div>

            <div>
              <FormLabel>University/Institute</FormLabel>
              <Input
                type="text"
                placeholder="Eg. NIT"
                onChange={handleChange}
                name="uni"
              />
              {errors.uni && <div style={{ color: "red" }}>{errors.uni}</div>}
            </div>

            <div>
              <FormLabel>Course Type</FormLabel>
              <Stack spacing={5} direction="row">
                <div>
                  <Checkbox
                    type="checkbox"
                    onChange={handleChange}
                    name="courseType"
                    value="Full-Time"
                  >
                    <FormLabel>Full-Time</FormLabel>
                  </Checkbox>
                  <Checkbox
                    type="checkbox"
                    onChange={handleChange}
                    name="courseType"
                    value="Part-Time"
                  >
                    <FormLabel>Part-Time</FormLabel>
                  </Checkbox>
                </div>
              </Stack>
            </div>

            <div>
              <FormLabel>Passing Year</FormLabel>
              <Input
                type="number"
                placeholder="Eg. 2023"
                onChange={handleChange}
                name="passYear"
              />
              {errors.passYear && (
                <div style={{ color: "red" }}>{errors.passYear}</div>
              )}
            </div>

            <div>
              <Button colorScheme="blue" onClick={saveEducationData}>Save</Button>
            </div>
           
          </div>
          </FormControl>
        </Box>

      </div>
        <FooterRegister />
      <div >

      </div>
    </div>
    </>
  );
};

export default Education;
