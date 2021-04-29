package com.ns.inviggoshop.dto;

import com.ns.inviggoshop.beans.Category;

public class AddAdvertisementDTO {

	private long id;
	private String name;
	private String description;
	private String imageUrl;
	private double price;
	private Category category;
	private String city;

	public AddAdvertisementDTO() {
		super();
	}

	public AddAdvertisementDTO(String name, String description, String imageUrl, double price, Category category,
			String city) {
		super();
		this.name = name;
		this.description = description;
		this.imageUrl = imageUrl;
		this.price = price;
		this.category = category;
		this.city = city;
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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

}
