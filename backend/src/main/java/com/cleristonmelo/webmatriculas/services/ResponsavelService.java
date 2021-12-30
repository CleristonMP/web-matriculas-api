package com.cleristonmelo.webmatriculas.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cleristonmelo.webmatriculas.dtos.AlunoDTO;
import com.cleristonmelo.webmatriculas.dtos.ResponsavelDTO;
import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.entities.Responsavel;
import com.cleristonmelo.webmatriculas.repositories.AlunoRepository;
import com.cleristonmelo.webmatriculas.repositories.ResponsavelRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class ResponsavelService {
	
	@Autowired
	private ResponsavelRepository repository;
	
	@Autowired
	private AlunoRepository alunoRepository;
	
	@Transactional(readOnly = true)
	public Page<ResponsavelDTO> findAllPaged(Pageable pageable) {
		Page<Responsavel> page = repository.findAll(pageable);
		return page.map(x -> new ResponsavelDTO(x));
	}
	
	@Transactional(readOnly = true)
	public ResponsavelDTO findById(Long id) {
		Optional<Responsavel> obj = repository.findById(id);
		Responsavel entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ResponsavelDTO(entity);
	}
	
	@Transactional
	public ResponsavelDTO insert(ResponsavelDTO dto) {
		Responsavel entity = new Responsavel();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ResponsavelDTO(entity);
	}

	@Transactional
	public ResponsavelDTO update(Long id, ResponsavelDTO dto) {
		try {
			Responsavel entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new ResponsavelDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	

	private void copyDtoToEntity(ResponsavelDTO dto, Responsavel entity) {
		entity.setNome(dto.getNome());
		entity.setSobrenome(dto.getSobrenome());
		entity.setRgOuCpf(dto.getRgOuCpf());
		entity.setTelefone(dto.getTelefone());
		
		entity.getAlunos().clear();
		for (AlunoDTO aluDto : dto.getAlunos()) {
			Aluno aluno = alunoRepository.getOne(aluDto.getMatricula());
			entity.getAlunos().add(aluno);
		}
	}	
}
