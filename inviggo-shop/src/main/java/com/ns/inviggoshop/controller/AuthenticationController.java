package com.ns.inviggoshop.controller;

import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ns.inviggoshop.beans.User;
import com.ns.inviggoshop.dto.LoginDTO;
import com.ns.inviggoshop.dto.SignUpDTO;
import com.ns.inviggoshop.dto.UserDTO;
import com.ns.inviggoshop.dto.UserTokenStateDTO;
import com.ns.inviggoshop.security.TokenUtils;
import com.ns.inviggoshop.service.CustomUserDetailsService;
import com.ns.inviggoshop.service.UserService;

@RestController
@RequestMapping(path = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

	@Autowired
	private TokenUtils tokenUtils;

	@Autowired
	private UserService userService;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	// Prvi endpoint koji pogadja korisnik kada se loguje.
	// Tada zna samo svoje korisnicko ime i lozinku i to prosledjuje na backend.
	@PostMapping("/log-in")
	public ResponseEntity<UserTokenStateDTO> createAuthenticationToken(@RequestBody LoginDTO authenticationRequest,
			HttpServletResponse response) {

		try {
			boolean verified = true;

			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));

			// Ubaci korisnika u trenutni security kontekst
			SecurityContextHolder.getContext().setAuthentication(authentication);

			// Kreiraj token za tog korisnika
			User user = (User) authentication.getPrincipal();

			String username = user.getUsername();
			String jwt = tokenUtils.generateToken(user.getUsername()); // prijavljujemo se na sistem sa email adresom
			int expiresIn = tokenUtils.getExpiredIn();

			// Vrati token kao odgovor na uspesnu autentifikaciju
			return ResponseEntity.ok(new UserTokenStateDTO(jwt, expiresIn, username, verified));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	// Endpoint za registraciju novog korisnika

	@PostMapping("/sign-up")
	public ResponseEntity<UserDTO> addUser(@RequestBody SignUpDTO userRequest) throws Exception {

		User existUser = this.userService.findUserByUsername(userRequest.getUsername());

		if (existUser != null) {
			return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
		}

		BCryptPasswordEncoder enc = new BCryptPasswordEncoder();
		userRequest.setPassword(enc.encode(userRequest.getPassword()));

		existUser = this.userService.create(userRequest);
		
		if(existUser == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");

		return new ResponseEntity<>(new UserDTO(existUser.getUsername(), sdf.format(existUser.getRegistrationDate()),
				existUser.getPhoneNumber()), HttpStatus.CREATED);

	}

}
