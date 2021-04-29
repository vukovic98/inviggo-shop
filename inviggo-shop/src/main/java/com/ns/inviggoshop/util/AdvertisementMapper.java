package com.ns.inviggoshop.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.ns.inviggoshop.beans.Advertisement;
import com.ns.inviggoshop.dto.AddAdvertisementDTO;
import com.ns.inviggoshop.dto.AdvertisementDetailsDTO;
import com.ns.inviggoshop.dto.UserDTO;

@Component
public class AdvertisementMapper {
	
	public ArrayList<AdvertisementDetailsDTO> listToDto(List<Advertisement> adList) {
		ArrayList<AdvertisementDetailsDTO> dtos = new ArrayList<>();
		
		for(Advertisement a : adList) {
			dtos.add(toDto(a));
		}
		
		return dtos;
	}

	public AdvertisementDetailsDTO toDto(Advertisement a) {
		AdvertisementDetailsDTO dto = new AdvertisementDetailsDTO();
		
		dto.setCategory(a.getCategory());
		dto.setCity(a.getCity());
		dto.setDescription(a.getDescription());
		dto.setId(a.getId());
		dto.setImageUrl(a.getImageUrl());
		dto.setName(a.getName());
		dto.setPrice(a.getPrice());
		
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		
		dto.setDate(sdf.format(a.getDate()));
		
		
		UserDTO u = new UserDTO();
		u.setPhoneNumber(a.getUser().getPhoneNumber());
		u.setRegistrationDate(sdf.format(a.getUser().getRegistrationDate()));
		u.setUsername(a.getUser().getUsername());
		
		dto.setUser(u);
		
		return dto;
	}
	
}
