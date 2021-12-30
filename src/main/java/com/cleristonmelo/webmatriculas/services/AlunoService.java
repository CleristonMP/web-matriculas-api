package com.cleristonmelo.webmatriculas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleristonmelo.webmatriculas.dtos.AlunoDTO;
import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.repositories.AlunoRepository;

@Service
public class AlunoService {
	
	@Autowired
	private AlunoRepository repository;
	
	@Transactional(readOnly = true)
	public Page<AlunoDTO> findAllPaged(Pageable pageable) {
		Page<Aluno> page = repository.findAll(pageable);
		return page.map(x -> new AlunoDTO(x));
	}

}
