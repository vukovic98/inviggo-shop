package com.ns.inviggoshop.dto;

import com.ns.inviggoshop.beans.Category;

public class FilterDTO {

	private String name;
	private double minPrice;
	private double maxPrice;
	private Category category;
	private boolean myAdds;

	public FilterDTO() {
		super();
	}

	public FilterDTO(String name, double minPrice, double maxPrice, Category category, boolean myAdds) {
		super();
		this.name = name;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.category = category;
		this.myAdds = myAdds;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(double minPrice) {
		this.minPrice = minPrice;
	}

	public double getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(double maxPrice) {
		this.maxPrice = maxPrice;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public boolean isMyAdds() {
		return myAdds;
	}

	public void setMyAdds(boolean myAdds) {
		this.myAdds = myAdds;
	}

}
