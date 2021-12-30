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
import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.repositories.AlunoRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class AlunoService {
	
	@Autowired
	private AlunoRepository repository;
	
	@Transactional(readOnly = true)
	public Page<AlunoDTO> findAllPaged(Pageable pageable) {
		Page<Aluno> page = repository.findAll(pageable);
		return page.map(x -> new AlunoDTO(x));
	}
	
	@Transactional(readOnly = true)
	public AlunoDTO findByMatricula(Long matricula) {
		Optional<Aluno> obj = repository.findById(matricula);
		Aluno entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new AlunoDTO(entity);
	}
	
	@Transactional
	public AlunoDTO insert(AlunoDTO dto) {
		Aluno entity = new Aluno();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AlunoDTO(entity);
	}

	@Transactional
	public AlunoDTO update(Long id, AlunoDTO dto) {
		try {
			Aluno entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new AlunoDTO(entity);
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
	

	private void copyDtoToEntity(AlunoDTO dto, Aluno entity) {
		entity.setNome(dto.getNome());
		entity.setSobrenome(dto.getSobrenome());
		entity.setRgOuCpf(dto.getRgOuCpf());
		entity.setDataNascimento(dto.getDataNascimento());
		entity.setEndereco(dto.getEndereco());
		entity.setTurma(dto.getTurma());
		entity.setResponsavel(dto.getResponsavel());
	}	
}
