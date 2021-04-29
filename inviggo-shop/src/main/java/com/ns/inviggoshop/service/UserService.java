package com.ns.inviggoshop.service;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ns.inviggoshop.beans.Authority;
import com.ns.inviggoshop.beans.User;
import com.ns.inviggoshop.dto.SignUpDTO;
import com.ns.inviggoshop.repository.AuthorityRepository;
import com.ns.inviggoshop.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthorityRepository authRepository;
	
	public User findUserByUsername(String username) {
		return this.userRepository.findByUsername(username);
	}

	public User create(SignUpDTO dto) {
		if(dto == null || dto.getUsername() == null && dto.getPassword() == null || dto.getPhoneNumber() == null) {
			return null;
		} else {
			if(dto.getUsername().equalsIgnoreCase("") || dto.getPassword().equalsIgnoreCase("") || dto.getPhoneNumber().equalsIgnoreCase(""))
				return null;
		}
			
		User u = new User();
		
		Authority auth = authRepository.findByName("ROLE_USER");
		ArrayList<Authority> aL = new ArrayList<>();
		aL.add(auth);
		
		u.setAuthorities(aL);
		u.setPassword(dto.getPassword());
		u.setUsername(dto.getUsername());
		u.setPhoneNumber(dto.getPhoneNumber());
		u.setRegistrationDate(new Date());
		
		User saved = this.userRepository.save(u);
		
		return saved;
	}
	
}
