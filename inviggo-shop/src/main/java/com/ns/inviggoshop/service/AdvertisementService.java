package com.ns.inviggoshop.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ns.inviggoshop.beans.Advertisement;
import com.ns.inviggoshop.beans.User;
import com.ns.inviggoshop.dto.AddAdvertisementDTO;
import com.ns.inviggoshop.repository.AdvertisementRepository;

@Service
public class AdvertisementService {

	@Autowired
	private AdvertisementRepository adRepository;

	@Autowired
	private UserService userService;

	public Advertisement findById(long id) {
		return this.adRepository.findById(id).orElse(null);
	}

	public Page<Advertisement> findAllPageable(Pageable pageable) {
		return this.adRepository.findAll(pageable);
	}
	
	public Advertisement create(AddAdvertisementDTO dto, String username) {
		User u = this.userService.findUserByUsername(username);

		if (u != null) {

			Advertisement a = new Advertisement();

			a.setCategory(dto.getCategory());
			a.setCity(dto.getCity());
			a.setDate(new Date());
			a.setDescription(dto.getDescription());
			a.setImageUrl(dto.getImageUrl());
			a.setName(dto.getName());
			a.setPrice(dto.getPrice());
			a.setUser(u);

			Advertisement saved = this.adRepository.save(a);

			return saved;
		} else
			return null;
	}

	public Advertisement update(AddAdvertisementDTO dto) {
		Advertisement a = this.adRepository.findById(dto.getId()).orElse(null);

		if (a != null) {
			a.setCategory(dto.getCategory());
			a.setCity(dto.getCity());
			a.setDate(new Date());
			a.setDescription(dto.getDescription());
			a.setImageUrl(dto.getImageUrl());
			a.setName(dto.getName());
			a.setPrice(dto.getPrice());

			Advertisement saved = this.adRepository.save(a);

			return saved;
		} else {
			return null;
		}
	}

	public boolean delete(long id) {
		try {
			this.adRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
