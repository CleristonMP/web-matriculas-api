package com.cleristonmelo.webmatriculas.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cleristonmelo.webmatriculas.dtos.AlunoDTO;
import com.cleristonmelo.webmatriculas.services.AlunoService;

@RestController
@RequestMapping(value = "/alunos")
public class AlunoResource {
	
	@Autowired
	private AlunoService service;
	
	@GetMapping
	public ResponseEntity<Page<AlunoDTO>> findAll(Pageable pageable) {
		Page<AlunoDTO> page = service.findAllPaged(pageable);
		return ResponseEntity.ok().body(page);
	}
}
