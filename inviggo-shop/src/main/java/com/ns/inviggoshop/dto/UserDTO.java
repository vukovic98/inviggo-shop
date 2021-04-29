package com.ns.inviggoshop.dto;

public class UserDTO {

	private String username;
	private String registrationDate;
	private String phoneNumber;

	public UserDTO() {
		super();
	}

	public UserDTO(String username, String registrationDate, String phoneNumber) {
		super();
		this.username = username;
		this.registrationDate = registrationDate;
		this.phoneNumber = phoneNumber;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(String registrationDate) {
		this.registrationDate = registrationDate;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

}
