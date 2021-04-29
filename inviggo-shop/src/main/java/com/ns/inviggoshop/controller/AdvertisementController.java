package com.ns.inviggoshop.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ns.inviggoshop.beans.Advertisement;
import com.ns.inviggoshop.beans.User;
import com.ns.inviggoshop.dto.AddAdvertisementDTO;
import com.ns.inviggoshop.dto.AdvertisementDetailsDTO;
import com.ns.inviggoshop.dto.FilterDTO;
import com.ns.inviggoshop.service.AdvertisementService;
import com.ns.inviggoshop.service.UserService;
import com.ns.inviggoshop.util.AdvertisementMapper;
import com.ns.inviggoshop.util.PageImplMapper;
import com.ns.inviggoshop.util.PageImplementation;

@RestController
@RequestMapping(path = "/advertisement")
public class AdvertisementController {

	@Autowired
	private AdvertisementService adService;

	@Autowired
	private AdvertisementMapper addMapper;

	@Autowired
	private UserService userService;
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<AdvertisementDetailsDTO> findAdd(@PathVariable("id") long id) {
		if(id > 0) {
			Advertisement found = this.adService.findById(id);
			
			if(found != null) {
				AdvertisementDetailsDTO dto = this.addMapper.toDto(found);
				
				return new ResponseEntity<>(dto, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
		}
	}

	@GetMapping(path = "/by-page/{pageNum}")
	public ResponseEntity<PageImplementation<AdvertisementDetailsDTO>> findByPage(@PathVariable("pageNum") int pageNum) {
		Pageable pageRequest = PageRequest.of(pageNum, 20);

		Page<Advertisement> page = this.adService.findAllPageable(pageRequest);

		ArrayList<AdvertisementDetailsDTO> addsDTOS = this.addMapper.listToDto(page.toList());
		Page<AdvertisementDetailsDTO> pageOffersDTOS = new PageImpl<>(addsDTOS, page.getPageable(),
				page.getTotalElements());

		PageImplMapper<AdvertisementDetailsDTO> pageMapper = new PageImplMapper<>();
		PageImplementation<AdvertisementDetailsDTO> pageImpl = pageMapper.toPageImpl(pageOffersDTOS);

		return new ResponseEntity<>(pageImpl, HttpStatus.OK);
	}

	@PostMapping(path = "/filter/by-page/{pageNum}")
	public ResponseEntity<PageImplementation<AdvertisementDetailsDTO>> filterByPage(@PathVariable("pageNum") int pageNum,
			@RequestBody FilterDTO dto) {

		if (dto.isMyAdds()) {
			UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			String username = userDetails.getUsername();

			User u = this.userService.findUserByUsername(username);

			if (u != null) {
				Pageable pageRequest = PageRequest.of(pageNum, 20);

				Page<Advertisement> page = this.adService.filterMyAdds(pageRequest, dto, u.getId());

				ArrayList<AdvertisementDetailsDTO> addsDTOS = this.addMapper.listToDto(page.toList());
				Page<AdvertisementDetailsDTO> pageOffersDTOS = new PageImpl<>(addsDTOS, page.getPageable(),
						page.getTotalElements());

				PageImplMapper<AdvertisementDetailsDTO> pageMapper = new PageImplMapper<>();
				PageImplementation<AdvertisementDetailsDTO> pageImpl = pageMapper.toPageImpl(pageOffersDTOS);

				return new ResponseEntity<>(pageImpl, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} else {

			Pageable pageRequest = PageRequest.of(pageNum, 20);

			Page<Advertisement> page = this.adService.filter(pageRequest, dto);

			ArrayList<AdvertisementDetailsDTO> addsDTOS = this.addMapper.listToDto(page.toList());
			Page<AdvertisementDetailsDTO> pageOffersDTOS = new PageImpl<>(addsDTOS, page.getPageable(),
					page.getTotalElements());

			PageImplMapper<AdvertisementDetailsDTO> pageMapper = new PageImplMapper<>();
			PageImplementation<AdvertisementDetailsDTO> pageImpl = pageMapper.toPageImpl(pageOffersDTOS);

			return new ResponseEntity<>(pageImpl, HttpStatus.OK);
		}
	}

	
	@GetMapping(path = "my-adds/by-page/{pageNum}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<PageImplementation<AdvertisementDetailsDTO>> findMyAddsByPage(
			@PathVariable("pageNum") int pageNum) {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = userDetails.getUsername();

		User u = this.userService.findUserByUsername(username);

		if (u != null) {
			Pageable pageRequest = PageRequest.of(pageNum, 20);

			Page<Advertisement> page = this.adService.findMyAdds(pageRequest, u.getId());

			ArrayList<AdvertisementDetailsDTO> addsDTOS = this.addMapper.listToDto(page.toList());
			Page<AdvertisementDetailsDTO> pageOffersDTOS = new PageImpl<>(addsDTOS, page.getPageable(),
					page.getTotalElements());

			PageImplMapper<AdvertisementDetailsDTO> pageMapper = new PageImplMapper<>();
			PageImplementation<AdvertisementDetailsDTO> pageImpl = pageMapper.toPageImpl(pageOffersDTOS);

			return new ResponseEntity<>(pageImpl, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping()
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<HttpStatus> addAdvertisement(@RequestBody AddAdvertisementDTO dto) {

		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = userDetails.getUsername();

		Advertisement a = this.adService.create(dto, username);

		if (a != null)
			return new ResponseEntity<>(HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping()
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<HttpStatus> editAdvertisement(@RequestBody AddAdvertisementDTO dto) {

		Advertisement a = this.adService.update(dto);

		if (a != null)
			return new ResponseEntity<>(HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping(path = "/{id}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<HttpStatus> deleteAdvertisement(@PathVariable("id") long id) {

		boolean ok = this.adService.delete(id);

		if (ok)
			return new ResponseEntity<>(HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

}
