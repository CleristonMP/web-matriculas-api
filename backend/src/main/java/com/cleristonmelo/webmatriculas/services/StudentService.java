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
import com.cleristonmelo.webmatriculas.entities.Student;
import com.cleristonmelo.webmatriculas.repositories.StudentRepository;
import com.cleristonmelo.webmatriculas.repositories.AddressRepository;
import com.cleristonmelo.webmatriculas.repositories.ParentRepository;
import com.cleristonmelo.webmatriculas.repositories.SchoolClassRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class StudentService {
	
	@Autowired
	private StudentRepository repository;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private SchoolClassRepository schoolClassRepository;
	
	@Autowired
	private ParentRepository parentRepository;
	
	@Transactional(readOnly = true)
	public Page<StudentDTO> findAllPaged(Pageable pageable) {
		Page<Student> page = repository.findAll(pageable);
		return page.map(x -> new StudentDTO(x));
	}
	
	@Transactional(readOnly = true)
	public StudentDTO findByEnrollment(Long enrollment) {
		Optional<Student> obj = repository.findById(enrollment);
		Student entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new StudentDTO(entity);
	}
	
	@Transactional
	public StudentDTO insert(StudentDTO dto) {
		Student entity = new Student();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new StudentDTO(entity);
	}

	@Transactional
	public StudentDTO update(Long enrollment, StudentDTO dto) {
		try {
			Student entity = repository.getOne(enrollment);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new StudentDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + enrollment);
		}
	}

	public void delete(Long enrollment) {
		try {
			repository.deleteById(enrollment);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + enrollment);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	private void copyDtoToEntity(StudentDTO dto, Student entity) {
		entity.setName(dto.getName());
		entity.setLastName(dto.getLastName());
		entity.setCpf(dto.getCpf());
		entity.setBirthDate(dto.getBirthDate());
		entity.setAddress(addressRepository.getOne(dto.getAddressId()));
		entity.setSchoolClass(schoolClassRepository.getOne(dto.getSchoolClassId()));
		entity.setParent(parentRepository.getOne(dto.getParentId()));
	}
}
