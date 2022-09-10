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

import com.cleristonmelo.webmatriculas.dtos.StudentDTO;
import com.cleristonmelo.webmatriculas.dtos.ParentDTO;
import com.cleristonmelo.webmatriculas.entities.Student;
import com.cleristonmelo.webmatriculas.entities.Parent;
import com.cleristonmelo.webmatriculas.repositories.StudentRepository;
import com.cleristonmelo.webmatriculas.repositories.ParentRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class ParentService {
	
	@Autowired
	private ParentRepository repository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Transactional(readOnly = true)
	public Page<ParentDTO> findAllPaged(Pageable pageable) {
		Page<Parent> page = repository.findAll(pageable);
		return page.map(x -> new ParentDTO(x));
	}
	
	@Transactional(readOnly = true)
	public ParentDTO findById(Long id) {
		Optional<Parent> obj = repository.findById(id);
		Parent entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ParentDTO(entity, entity.getStudents());
	}
	
	@Transactional
	public ParentDTO insert(ParentDTO dto) {
		Parent entity = new Parent();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ParentDTO(entity);
	}

	@Transactional
	public ParentDTO update(Long id, ParentDTO dto) {
		try {
			Parent entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new ParentDTO(entity);
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

	private void copyDtoToEntity(ParentDTO dto, Parent entity) {
		entity.setName(dto.getName());
		entity.setLastName(dto.getLastName());
		entity.setCpf(dto.getCpf());
		entity.setPhone(dto.getPhone());
		
		entity.getStudents().clear();
		for (StudentDTO aluDto : dto.getStudents()) {
			Student student = studentRepository.getOne(aluDto.getEnrollment());
			entity.getStudents().add(student);
		}
	}	
}
