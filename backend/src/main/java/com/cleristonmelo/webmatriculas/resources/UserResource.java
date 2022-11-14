package com.cleristonmelo.webmatriculas.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cleristonmelo.webmatriculas.dtos.UserDTO;
import com.cleristonmelo.webmatriculas.dtos.UserInsertDTO;
import com.cleristonmelo.webmatriculas.dtos.UserUpdateDTO;
import com.cleristonmelo.webmatriculas.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResource {
	
	@Autowired
	private UserService service;
	
	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable,
			@RequestParam(value = "name", defaultValue = "") String name) {
		Page<UserDTO> page = service.findAllPaged(pageable, name);
		return ResponseEntity.ok().body(page);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long id){
		UserDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<UserDTO> insert(@RequestBody UserInsertDTO dto){
		UserDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();		
		return ResponseEntity.created(uri).body(newDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserUpdateDTO dto) {
		UserDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
