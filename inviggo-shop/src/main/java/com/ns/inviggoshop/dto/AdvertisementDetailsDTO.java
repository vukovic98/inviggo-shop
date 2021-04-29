package com.ns.inviggoshop.dto;

import com.ns.inviggoshop.beans.Category;

public class AdvertisementDetailsDTO {

	private long id;
	private String name;
	private String description;
	private String imageUrl;
	private double price;
	private Category category;
	private String city;
	private String date;
	private UserDTO user;

	public AdvertisementDetailsDTO() {
		super();
	}

	public AdvertisementDetailsDTO(long id, String name, String description, String imageUrl, double price,
			Category category, String city, String date, UserDTO user) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.imageUrl = imageUrl;
		this.price = price;
		this.category = category;
		this.city = city;
		this.date = date;
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

}
