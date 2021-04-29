package com.ns.inviggoshop.dto;

// DTO koji enkapsulira generisani JWT i njegovo trajanje koji se vracaju klijentu
public class UserTokenStateDTO {

	private String authenticationToken;
	private int expiresAt;
	private String username;
	private boolean verified;

	public UserTokenStateDTO() {
		this.verified = true;
	}

	public UserTokenStateDTO(String authenticationToken, int expiresAt) {
		super();
		this.authenticationToken = authenticationToken;
		this.expiresAt = expiresAt;
		this.verified = true;
	}

	public UserTokenStateDTO(String authenticationToken, int expiresAt, boolean verified) {
		super();
		this.authenticationToken = authenticationToken;
		this.expiresAt = expiresAt;
		this.verified = verified;
	}

	public UserTokenStateDTO(String authenticationToken, int expiresAt, String username, boolean verified) {
		super();
		this.authenticationToken = authenticationToken;
		this.expiresAt = expiresAt;
		this.username = username;
		this.verified = verified;
	}

	public UserTokenStateDTO(String authenticationToken, int expiresAt, String username) {
		super();
		this.authenticationToken = authenticationToken;
		this.expiresAt = expiresAt;
		this.username = username;
	}

	public String getAuthenticationToken() {
		return authenticationToken;
	}

	public void setAuthenticationToken(String authenticationToken) {
		this.authenticationToken = authenticationToken;
	}

	public int getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(int expiresAt) {
		this.expiresAt = expiresAt;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

}
