package com.job_finder.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.job_finder.entity.UserDtls;
import com.job_finder.helperClass.EducationData;
import com.job_finder.helperClass.Employment;
import com.job_finder.helperClass.LoginForm;
import com.job_finder.helperClass.RegistrationForm;
import com.job_finder.helperClass.UpdateProfile;
import com.job_finder.repository.UserRepository;
import com.job_finder.response.LoginMessage;
import com.job_finder.response.ProfileData;
import com.job_finder.response.UserProfileList;
import com.job_finder.service.UserService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository ur;



	@GetMapping("/get-user-profile/{userId}")
	public ResponseEntity<ProfileData> getUserData(@PathVariable Long userId) {

		log.info("get-user-profile with id end point call()" +userId);
		
		ProfileData userprofile = userService.getUserProfile(userId);
		return new ResponseEntity<>(userprofile, HttpStatus.OK);
	}

	@PostMapping("/register")
	public Boolean saveEmployee(@RequestBody RegistrationForm form) {
		return userService.addEmployee(form);
	}

	@PostMapping("/set-password")
	public ResponseEntity<String> setPassword(@RequestParam("email") String email,
			@RequestParam("password") String password) {
		String result = userService.setPassword(email, password);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<String> verifyOTP(@RequestParam("email") String email, @RequestParam("otp") String otp) {
		// Perform OTP verification logic here
		Boolean flag = userService.getOtp(email, otp);

		if (flag) {
			return ResponseEntity.ok("OTP verification successful");
		} else {
			return ResponseEntity.badRequest().body("Invalid OTP");
		}
	}

	@PostMapping("/login")
	public ResponseEntity<LoginMessage> loginEmployee(@RequestBody LoginForm loginForm) {
		LoginMessage loginResponse = userService.loginEmployee(loginForm);
		return new ResponseEntity<>(loginResponse, HttpStatus.OK);

	}

	@PostMapping("/employment-save")
	public ResponseEntity<String> saveEmploymentData(@RequestBody Employment employmentData) {
		try {
			String msg = userService.saveEmploymentData(employmentData);
			return new ResponseEntity<>(msg, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error saving data: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/test")
	public ResponseEntity<List<UserDtls>> welcome() {

		return new ResponseEntity<>(ur.findAll(), HttpStatus.OK);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<UserDtls> getUserById(@PathVariable Long userId) {
		Optional<UserDtls> user = userService.getUserDetailsById(userId);
		return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping("/save")
	public ResponseEntity<Boolean> createUser(@RequestBody UserDtls user) {
		boolean isRegister = userService.createUser(user);

		return new ResponseEntity<>(isRegister, HttpStatus.CREATED);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<UserDtls> updateUser(@PathVariable Long userId, @RequestBody UserDtls updatedUser) {
		UserDtls updated = userService.updateUser(userId, updatedUser);
		return updated != null ? new ResponseEntity<>(updated, HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
		userService.deleteUser(userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("/education-save")
	public ResponseEntity<String> saveEducationDetails(@RequestBody EducationData educationDetails) {
		userService.saveEducationDetails(educationDetails);
		return new ResponseEntity<>("Education details saved successfully", HttpStatus.OK);
	}

	@GetMapping("profile-update/{profileId}")
	public ResponseEntity<UpdateProfile> getProfileById(@PathVariable Long profileId) {
		UpdateProfile profile = userService.getProfileById(profileId);
		return new ResponseEntity<>(profile, HttpStatus.OK);
	}

	@PutMapping("profile-update/{profileId}")
	public ResponseEntity<String> updateExistingProfile(@PathVariable Long profileId,
			@RequestBody UpdateProfile updateProfile, @RequestPart(required = false) MultipartFile resumeFile) {

		// Handle the resume file if provided
		if (resumeFile != null && !resumeFile.isEmpty()) {
			byte[] resumeBytes;
			try {
				resumeBytes = resumeFile.getBytes();
				updateProfile.setResume(resumeBytes);
			} catch (IOException e) {
				// Handle exception (e.g., log it) or return an error response
				return new ResponseEntity<>("Error processing resume file", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		String updatedProfile = userService.updateProfile(profileId, updateProfile);
		return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
	}

	@GetMapping("/profiles")
	public List<UserProfileList> getUserProfiles(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		return userService.getUserProfileList(page, size);
	}

	
	@PostMapping("/upload-image/{profileId}")
	public ResponseEntity<String> uploadimage(@PathVariable Long profileId, @RequestPart("file") MultipartFile file) {

			if (file.isEmpty()) {
				return new ResponseEntity<>("File is empty", HttpStatus.BAD_REQUEST);
			}
			String msg =userService.addImage(profileId,file);

			return new ResponseEntity<>(msg, HttpStatus.OK);


	}

	@GetMapping("/image/{profileId}")
	public ResponseEntity<Resource> getImage(@PathVariable Long profileId) {
		ResponseEntity<Resource> msg =userService.getProfileImage(profileId);

		return msg;
	}
	
	@PostMapping("/upload-file/{profileId}")
	public ResponseEntity<String> uploadfile(@PathVariable Long profileId, @RequestPart("file") MultipartFile file) {

			if (file.isEmpty()) {
				return new ResponseEntity<>("File is empty", HttpStatus.BAD_REQUEST);
			}
			String msg =userService.addfile(profileId,file);
			return new ResponseEntity<>(msg, HttpStatus.OK);
	}

	@GetMapping("/file/{profileId}")
	public ResponseEntity<Resource> getfile(@PathVariable Long profileId) {
		ResponseEntity<Resource> msg =userService.getProfile(profileId);

		return msg;
	}
}
