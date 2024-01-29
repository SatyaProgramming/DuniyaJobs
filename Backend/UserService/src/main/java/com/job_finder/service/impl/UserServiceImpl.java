package com.job_finder.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.job_finder.entity.UserDtls;
import com.job_finder.exception.EmptyInputException;
import com.job_finder.exception.ErrorMessage;
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
import com.job_finder.utility.EmailUtils;
import com.job_finder.utility.PasswordUtils;

import org.springframework.core.io.Resource;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailUtils emailUtils;

	@Override
	public List<UserDtls> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public Optional<UserDtls> getUserById(Long userId) {
		return userRepository.findById(userId);
	}

	@Override
	public boolean createUser(UserDtls user) {
		userRepository.save(user);
		return true;
	}

	@Override
	public UserDtls updateUser(Long userId, UserDtls updatedUser) {
		Optional<UserDtls> optionalUser = userRepository.findById(userId);
		if (optionalUser.isPresent()) {
			UserDtls existingUser = optionalUser.get();
			existingUser.setFullName(updatedUser.getFullName());
			existingUser.setEmailId(updatedUser.getEmailId());
			existingUser.setMobileNumber(updatedUser.getMobileNumber());
			existingUser.setPassword(updatedUser.getPassword());
			existingUser.setDescription(updatedUser.getDescription());
			existingUser.setWorkStatus(updatedUser.getWorkStatus());
			existingUser.setResume(updatedUser.getResume());

			return userRepository.save(existingUser);
		} else {
			// Handle user not found
			return null;
		}
	}

	@Override
	public void deleteUser(Long userId) {
		userRepository.deleteById(userId);
	}

	@Override
	public Optional<UserDtls> getUserDetailsById(Long userId) {
		Optional<UserDtls> optionalUser = userRepository.findById(userId);

		return optionalUser.map(user -> {
			UserDtls userDtls = new UserDtls();
			userDtls.setFullName(user.getFullName());
			userDtls.setEmailId(user.getEmailId());
			userDtls.setMobileNumber(user.getMobileNumber());
			userDtls.setDescription(user.getDescription());
			userDtls.setWorkStatus(user.getWorkStatus());
			return userDtls;
		});
	}

	@Override
	public Boolean addEmployee(RegistrationForm form) {
		String tempPwd = PasswordUtils.generateRandomePWD();
		MessageDigest digest;
		try {
			digest = MessageDigest.getInstance("SHA-256");
			digest.reset();
			digest.update(tempPwd.getBytes());
			byte[] encryptedPwd = digest.digest();
			// Use Base64 encoding correctly
			String encodedPwd = Base64.getEncoder().encodeToString(encryptedPwd);

			// Update the user's password with the hashed value
			UserDtls user = new UserDtls();
			user.setFullName(form.getName());
			user.setEmailId(form.getEmailId());
			user.setMobileNumber(form.getMobileNumber());
			user.setPassword(encodedPwd); // Update the user's password with the hashed value
			user.setAccStatus("LOCKED");

			userRepository.save(user);

			String to = form.getEmailId();
			String subject = "Verification YOUR ACCOUNT";
			StringBuffer body = new StringBuffer();
			body.append("<h1>OTP for verify your account</h1><br>");
			body.append("<h3>" + tempPwd + "</h3>");
			emailUtils.sendMail(to, subject, body.toString());

			return true;
		} catch (NoSuchAlgorithmException e) {
			// Handle the exception appropriately (log, throw, etc.)
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Boolean getOtp(String email, String otp) {
		UserDtls user = userRepository.findByEmailId(email);
		// Check if the user is found
		if (user != null) {
			String pwd = user.getPassword();
			MessageDigest digest;
			try {
				digest = MessageDigest.getInstance("SHA-256");
				digest.reset();
				digest.update(otp.getBytes());
				byte[] encryptedPwd = digest.digest();
				// Use Base64 encoding correctly
				String encodedPwd = Base64.getEncoder().encodeToString(encryptedPwd);

				// Check if the OTP matches the expected OTP (sent to the user)
				if (encodedPwd.equals(pwd) && !"".equals(encodedPwd)) {

					// Update account status (if needed)
					user.setAccStatus("UNLOCKED");

					// Save the updated user entity to the database
					userRepository.save(user);

					return true;
				}
			} catch (Exception e) {
				// Handle the exception appropriately (log, throw, etc.) using exception class.
				throw new ErrorMessage(e);
			}
		}

		// If any of the conditions fail, return false
		return false;
	}

	public String setPassword(String email, String password) {
		UserDtls user = userRepository.findByEmailId(email);
		if (user != null) {
			MessageDigest digest;
			try {
				digest = MessageDigest.getInstance("SHA-256");
				digest.reset();
				digest.update(password.getBytes());
				byte[] encryptedPwd = digest.digest();
				// Use Base64 encoding correctly
				String encodedPwd = Base64.getEncoder().encodeToString(encryptedPwd);

				user.setPassword(encodedPwd);
				userRepository.save(user);
				return "Password set successfully";
			} catch (NoSuchAlgorithmException e) {
				// Handle the exception appropriately (log, throw, etc.)
				e.printStackTrace();
				return "check password";
			}
		} else {
			return "User not found";
		}
	}

	@Override
	public LoginMessage loginEmployee(LoginForm loginForm) {
		UserDtls user = userRepository.findByEmailId(loginForm.getEmail());

		if (user != null) {
			String password = loginForm.getPassword();

			try {
				MessageDigest digest = MessageDigest.getInstance("SHA-256");
				digest.reset();
				digest.update(password.getBytes());
				byte[] encryptedPwd = digest.digest();
				// Use Base64 encoding correctly
				String encodedPwd = Base64.getEncoder().encodeToString(encryptedPwd);

				// Compare the hashed password with the stored hashed password
				if (user.getPassword().equals(encodedPwd)) {
					return new LoginMessage("Login Success", true, user.getSrno());
				} else {
					return new LoginMessage("Password does not match", false, user.getSrno());
				}
			} catch (NoSuchAlgorithmException e) {
				// Handle the exception appropriately (log, throw, etc.)
				e.printStackTrace();
				return new LoginMessage("Error during login", false, null);
			}
		} else {
			return new LoginMessage("Email does not exist", false, null);
		}
	}

	@Override
	public String saveEmploymentData(Employment employmentData) {
		UserDtls user = userRepository.findBySrno(employmentData.getSrno());
		if (user != null) {
			user.setEmployed(employmentData.isEmployed());
			user.setExperienceYears(employmentData.getExperienceYears());
			user.setExperienceMonths(employmentData.getExperienceMonths());
			user.setPrevCompany(employmentData.getPrevCompany());
			user.setPrevJob(employmentData.getPrevJob());
			user.setCity(employmentData.getCity());
			user.setAnnualSalary(employmentData.getAnnualSalary());
			userRepository.save(user);
			return "data save";
		} else
			return "data note save";
	}

//	 @Override
//	    public List<EducationData> getAllEducationDetails() {
//	        return educationRepository.findAll();
//	    }

//	    @Override
//	    public EducationData getEducationDetailsById(Long id) {
//	        Optional<EducationData> optionalEducationDetails = educationRepository.findById(id);
//	        return optionalEducationDetails.orElse(null);
//	    }

	@Override
	public void saveEducationDetails(EducationData educationDetails) {

		UserDtls user = userRepository.findBySrno(educationDetails.getSrno());
		user.setQualification(educationDetails.getQualification());
		user.setCourse(educationDetails.getCourse());
		user.setSpecialize(educationDetails.getSpecialize());
		user.setUni(educationDetails.getUni());
		user.setCourseType(educationDetails.getCourseType());
		user.setPassYear(educationDetails.getPassYear());
		userRepository.save(user);
	}
//	    @Override
//	    public void deleteEducationDetails(Long id) {
//	        educationRepository.deleteById(id);
//	    }

	@Override
	public ProfileData getUserProfile(Long userId) {
		UserDtls user = userRepository.findBySrno(userId);
		if(user.getFullName() != null && ! user.getFullName().isEmpty() && 
				 user.getCourse().isEmpty()&& user.getCourse()!=null &&
				 user.getUni().isEmpty()&& user.getUni()!=null){
					
					ProfileData userProf = new ProfileData();
					userProf.setName(user.getFullName());
					userProf.setEducation(user.getCourse());
					userProf.setInstitute(user.getUni());
					userProf.setCompletionPercentage(75);
					userProf.setDetailsMissing(1);
					userProf.setSearchAppearances(8);
					userProf.setRecruiterAction(4);
					userProf.setBoostMessage("3X Boost to Your Profile Performance. Explore.");
					userProf.setPaidService("Paid Service");
					
			return userProf;
		   
		}else {
		
		 throw new EmptyInputException(501,"dataNotFoundException");
		}
	}

	@Override
	public String updateProfile(Long profileId, UpdateProfile updateProfile) {
		UserDtls existingProfile = userRepository.findBySrno(profileId);
		if (existingProfile != null) {
			// Update fields based on the new data
			existingProfile.setFullName(updateProfile.getFullName());
			existingProfile.setMobileNumber(updateProfile.getMobileNumber());
			existingProfile.setResume(updateProfile.getResume());
			existingProfile.setEmployed(updateProfile.isEmployed());
			existingProfile.setExperienceYears(updateProfile.getExperienceYears());
			existingProfile.setExperienceMonths(updateProfile.getExperienceMonths());
			existingProfile.setPrevCompany(updateProfile.getPrevCompany());
			existingProfile.setPrevJob(updateProfile.getPrevJob());
			existingProfile.setCity(updateProfile.getCity());
			existingProfile.setAnnualSalary(updateProfile.getAnnualSalary());

			userRepository.save(existingProfile);
			return "Successfully Updated..";
		} else {
			return "fail to Update...?";
		}
	}

	@Override
	public UpdateProfile getProfileById(Long profileId) {
		UserDtls existingProfile = userRepository.findBySrno(profileId);
		if (existingProfile != null) {
			UpdateProfile updateProfile = new UpdateProfile();
			updateProfile.setUid(profileId);
			updateProfile.setFullName(existingProfile.getFullName());
			updateProfile.setMobileNumber(existingProfile.getMobileNumber());
			updateProfile.setResume(existingProfile.getResume());
			updateProfile.setEmployed(existingProfile.isEmployed());
			updateProfile.setExperienceYears(existingProfile.getExperienceYears());
			updateProfile.setExperienceMonths(existingProfile.getExperienceMonths());
			updateProfile.setPrevCompany(existingProfile.getPrevCompany());
			updateProfile.setPrevJob(existingProfile.getPrevJob());
			updateProfile.setCity(existingProfile.getCity());
			updateProfile.setAnnualSalary(existingProfile.getAnnualSalary());
			return updateProfile;
		}
		return null;
	}

	@Override
	public List<UserProfileList> getUserProfileList(int page, int size) {
		Sort sort = Sort.by("createdDate").descending();
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<UserDtls> userProfileListPage = userRepository.findAll(pageable);

		// Convert UserDtls entities to UserProfileList objects
		List<UserProfileList> userProfileList = convertToUserProfileList(userProfileListPage.getContent());

		return userProfileList;
	}

	private List<UserProfileList> convertToUserProfileList(List<UserDtls> userDtlsList) {
		List<UserProfileList> userProfileList = new ArrayList<>();

		for (UserDtls userDtls : userDtlsList) {
			UserProfileList userProfile = new UserProfileList();
			userProfile.setFullName(userDtls.getFullName());
			userProfile.setSpecialize(userDtls.getSpecialize());
			userProfile.setUni(userDtls.getUni());

			userProfileList.add(userProfile);
		}

		return userProfileList;
	}

	
	private static final String UPLOAD_DIR = "static/images";

	@Override
	public String addImage(Long profileId, MultipartFile file) {
	    try {
	        if (file.isEmpty()) {
	            return "File is empty";
	        }

	        Optional<UserDtls> optionalUser = userRepository.findById(profileId);
	        if (optionalUser.isPresent()) {
	            UserDtls user = optionalUser.get();
	            // Generate a unique filename
	            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
	            user.setImgName(fileName);

	            // Extract file type from the original filename
	            String fileType = getFileType(file.getOriginalFilename());
	            user.setImgType(fileType);

	            // Resolve the upload directory
	            Path uploadPath = Paths.get("src/main/resources/" + UPLOAD_DIR).toAbsolutePath().normalize();
	            File directory = new File(uploadPath.toString());
	            if (!directory.exists()) {
	                if (directory.mkdirs()) {
	                    System.out.println("Directory created successfully.");
	                } else {
	                    System.out.println("Failed to create directory.");
	                    return "Failed to create directory";
	                }
	            }

	            // Save the file to the server
	            Path filePath = uploadPath.resolve(fileName).normalize();
	            file.transferTo(filePath.toFile());
	            System.out.println("File uploaded successfully. Path: " + filePath);

	            // Set the full file path in imgPath
	            user.setImgPath(filePath.toString());

	            // Save the changes to the UserDtls object
	            userRepository.save(user);

	            return "File uploaded successfully";
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	        return "Failed to upload file";
	    }

	    // Return an appropriate message if the user is not present
	    return "User not found";
	}

	// Helper method to extract file type from the filename
	private String getFileType(String filename) {
	    int dotIndex = filename.lastIndexOf('.');
	    if (dotIndex > 0 && dotIndex < filename.length() - 1) {
	        return filename.substring(dotIndex + 1).toLowerCase();
	    }
	    return null;
	}



	@Override
	public ResponseEntity<Resource> getProfileImage(Long profileId) {
	    try {
	        Optional<UserDtls> optionalUser = userRepository.findById(profileId);
	        if (optionalUser.isPresent()) {
	            UserDtls user = optionalUser.get();
	            // Validate or sanitize the file name to prevent directory traversal attacks
	            String fileName = user.getImgName();
	            String sanitizedFileName = FilenameUtils.getName(fileName);
	            Path filePath = Paths.get("src/main/resources/static/images").resolve(sanitizedFileName).normalize();
	            
	            // Use FileSystemResource instead of UrlResource
	            Resource resource = new FileSystemResource(filePath.toFile());

	            // Log the file path for debugging

	            // Check if the file exists and is readable
	            if (resource.exists() && resource.isReadable()) {
	                // Dynamically determine content type based on file extension
	                String contentType = Files.probeContentType(filePath);

	                HttpHeaders headers = new HttpHeaders();
	                headers.setContentType(MediaType.parseMediaType(contentType));

	                return ResponseEntity.ok().headers(headers).body(resource);
	            } else {
	                return ResponseEntity.notFound().build();
	            }
	        } else {
	            return ResponseEntity.notFound().build(); // Return 404 if the user is not found
	        }
	    } catch (IOException e) {
	        e.printStackTrace(); // Log the error

	        // Provide a more informative response for internal server errors
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(null); // You may consider returning a specific Resource instance here
	    }
	}
	
	
	
	private static final String UPLOAD_DIR2 = "static/files";

	@Override
	public String addfile(Long profileId, MultipartFile file) {
	    try {
	        if (file.isEmpty()) {
	            return "File is empty";
	        }

	        Optional<UserDtls> optionalUser = userRepository.findById(profileId);
	        if (optionalUser.isPresent()) {
	            UserDtls user = optionalUser.get();
	            // Generate a unique filename
	            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
	            user.setResumeName(fileName);

	            // Extract file type from the original filename
	            String fileType = getFileType2(file.getOriginalFilename());
	        
	           
	        	
	            // Resolve the upload directory
	            Path uploadPath = Paths.get("src/main/resources/" + UPLOAD_DIR2).toAbsolutePath().normalize();
	            
	            
	            
	            File directory = new File(uploadPath.toString());
	            if (!directory.exists()) {
	                if (directory.mkdirs()) {
	                    System.out.println("Directory created successfully.");
	                } else {
	                    System.out.println("Failed to create directory.");
	                    return "Failed to create directory";
	                }
	            }

	            // Save the file to the server
	            Path filePath = uploadPath.resolve(fileName).normalize();
	            file.transferTo(filePath.toFile());
	            System.out.println("File uploaded successfully. Path: " + filePath);

	            // Set the full file path in imgPath
	            user.setResumePath(filePath.toString());

	            // Save the changes to the UserDtls object
	            
	            if(fileType.equals("pdf")) {  
	                  user.setResumeType(fileType);
	                  userRepository.save(user);
	        	  }else {
	        		throw new EmptyInputException(500,"Only pdf files are accepting...");
	        	  }
	            return "File uploaded successfully";
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	        return "Failed to upload file";
	    }

	    // Return an appropriate message if the user is not present
	    return "User not found";
	}

	// Helper method to extract file type from the filename
	private String getFileType2(String filename) {
	    int dotIndex = filename.lastIndexOf('.');
	    if (dotIndex > 0 && dotIndex < filename.length() - 1) {
	        return filename.substring(dotIndex + 1).toLowerCase();
	    }
	    return null;
	}



	@Override
	public ResponseEntity<Resource> getProfile(Long profileId) {
	    try {
	        Optional<UserDtls> optionalUser = userRepository.findById(profileId);
	        if (optionalUser.isPresent()) {
	            UserDtls user = optionalUser.get();
	            // Validate or sanitize the file name to prevent directory traversal attacks
	            String fileName = user.getImgName();
	            String sanitizedFileName = FilenameUtils.getName(fileName);
	            Path filePath = Paths.get("src/main/resources/static/files").resolve(sanitizedFileName).normalize();
	            
	            // Use FileSystemResource instead of UrlResource
	            Resource resource = new FileSystemResource(filePath.toFile());

	            // Log the file path for debugging
	            System.out.println("File Path: " + filePath);

	            // Check if the file exists and is readable
	            if (resource.exists() && resource.isReadable()) {
	                // Dynamically determine content type based on file extension
	                String contentType = Files.probeContentType(filePath);

	                HttpHeaders headers = new HttpHeaders();
	                headers.setContentType(MediaType.parseMediaType(contentType));

	                return ResponseEntity.ok().headers(headers).body(resource);
	            } else {
	                return ResponseEntity.notFound().build();
	            }
	        } else {
	            return ResponseEntity.notFound().build(); // Return 404 if the user is not found
	        }
	    } catch (IOException e) {
	        e.printStackTrace(); // Log the error

	        // Provide a more informative response for internal server errors
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(null); // You may consider returning a specific Resource instance here
	    }
	}


}