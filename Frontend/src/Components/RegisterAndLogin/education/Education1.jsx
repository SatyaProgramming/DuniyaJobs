import NavbarRegister from "../NavAndFooter/NavbarRegister";
import FooterRegister from "../NavAndFooter/FooterRegister";
import style from "./Education.module.css";
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Checkbox,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const [educationData, setEducationData] = useState({
    srno: 52,
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
     const response= await axios.post("http://localhost:8081/education-save", educationData);
      if (response.status === 200) {
        
        Alert('Your data was successfully submitted.', true);
      }
      console.log("Education data saved successfully");
      // You may navigate to the next page or perform other actions here
    } catch (error) {
      console.error("Error saving education data:", error.message);
      Alert('There was an error submitting your data.', false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <NavbarRegister />
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
                <FormLabel htmlFor="qualification">
                  Highest Qualification
                </FormLabel>
                <Stack spacing={5} direction="row">
                  <Checkbox
                    colorScheme="green"
                    defaultChecked
                    onChange={() =>
                      handleQualificationChange("Graduation/Diploma")
                    }
                  >
                    Graduation/Diploma
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    onChange={() => handleQualificationChange("Masters")}
                  >
                    Masters
                  </Checkbox>
                  <Checkbox
                    colorScheme="green"
                    onChange={() => handleQualificationChange("High School")}
                  >
                    High School
                  </Checkbox>
                </Stack>
              </div>

              <div>
                <FormLabel htmlFor="course">Course</FormLabel>
                <Input
                  id="course"
                  type="text"
                  placeholder="Eg. BSc"
                  onChange={handleChange}
                />
                {errors.course && (
                  <div style={{ color: "red" }}>{errors.course}</div>
                )}
              </div>

              <div>
                <FormLabel htmlFor="specialize">Specialization</FormLabel>
                <Input
                  id="specialize"
                  type="text"
                  placeholder="Eg. Electronics"
                  onChange={handleChange}
                />
              </div>

              <div>
                <FormLabel htmlFor="uni">University/Institute</FormLabel>
                <Input
                  id="uni"
                  type="text"
                  placeholder="Eg. NIT"
                  onChange={handleChange}
                />
                {errors.uni && (
                  <div style={{ color: "red" }}>{errors.uni}</div>
                )}
              </div>

              <div>
                <FormLabel htmlFor="courseType">Course Type</FormLabel>
                <Stack spacing={5} direction="row">
                  <Checkbox colorScheme="green" defaultChecked>
                    Full-Time
                  </Checkbox>
                  <Checkbox colorScheme="green">Part-Time</Checkbox>
                </Stack>
              </div>

              <div>
                <FormLabel htmlFor="passYear">Passing Year</FormLabel>
                <Input
                  id="passYear"
                  type="number"
                  placeholder="Eg. 2020"
                  onChange={handleChange}
                />
                {errors.passYear && (
                  <div style={{ color: "red" }}>{errors.passYear}</div>
                )}
              </div>

              <div>
                <Button colorScheme="blue" onClick={saveEducationData}>
                  Save and Continue
                </Button>
              </div>
            </div>
          </FormControl>

          <FooterRegister />
        </Box>
      </div>
    </div>
  );
};

export default Education;
