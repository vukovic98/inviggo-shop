package com.ns.inviggoshop.dto;

public class SignUpDTO {

	private String username;
	private String password;
	private String phoneNumber;

	public SignUpDTO() {
		super();
	}

	public SignUpDTO(String username, String password, String phoneNumber) {
		super();
		this.username = username;
		this.password = password;
		this.phoneNumber = phoneNumber;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

}
