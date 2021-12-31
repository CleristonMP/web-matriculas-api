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
import com.cleristonmelo.webmatriculas.dtos.TurmaDTO;
import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.entities.Turma;
import com.cleristonmelo.webmatriculas.repositories.AlunoRepository;
import com.cleristonmelo.webmatriculas.repositories.TurmaRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class TurmaService {
	
	@Autowired
	private TurmaRepository repository;
	
	@Autowired
	private AlunoRepository alunoRepository;
	
	@Transactional(readOnly = true)
	public Page<TurmaDTO> findAllPaged(Pageable pageable) {
		Page<Turma> page = repository.findAll(pageable);
		return page.map(x -> new TurmaDTO(x));
	}
	
	@Transactional(readOnly = true)
	public TurmaDTO findById(Long id) {
		Optional<Turma> obj = repository.findById(id);
		Turma entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new TurmaDTO(entity, entity.getAlunos());
	}
	
	@Transactional
	public TurmaDTO insert(TurmaDTO dto) {
		Turma entity = new Turma();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new TurmaDTO(entity);
	}

	@Transactional
	public TurmaDTO update(Long id, TurmaDTO dto) {
		try {
			Turma entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new TurmaDTO(entity);
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
	

	private void copyDtoToEntity(TurmaDTO dto, Turma entity) {
		entity.setNome(dto.getNome());
		entity.setPeriodo(dto.getPeriodo());
		
		entity.getAlunos().clear();
		for (AlunoDTO aluDto : dto.getAlunos()) {
			Aluno aluno = alunoRepository.getOne(aluDto.getMatricula());
			entity.getAlunos().add(aluno);
		}
	}	
}
