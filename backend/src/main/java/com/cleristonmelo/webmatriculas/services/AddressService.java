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
import com.cleristonmelo.webmatriculas.dtos.AddressDTO;
import com.cleristonmelo.webmatriculas.entities.Student;
import com.cleristonmelo.webmatriculas.entities.Address;
import com.cleristonmelo.webmatriculas.repositories.StudentRepository;
import com.cleristonmelo.webmatriculas.repositories.AddressRepository;
import com.cleristonmelo.webmatriculas.repositories.CountyRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class AddressService {
	
	@Autowired
	private AddressRepository repository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private CountyRepository countyRepository;
	
	@Transactional(readOnly = true)
	public Page<AddressDTO> findAllPaged(Pageable pageable) {
		Page<Address> page = repository.findAll(pageable);
		return page.map(x -> new AddressDTO(x));
	}
	
	@Transactional(readOnly = true)
	public AddressDTO findById(Long id) {
		Optional<Address> obj = repository.findById(id);
		Address entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new AddressDTO(entity, entity.getStudents());
	}
	
	@Transactional
	public AddressDTO insert(AddressDTO dto) {
		Address entity = new Address();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AddressDTO(entity);
	}

	@Transactional
	public AddressDTO update(Long id, AddressDTO dto) {
		try {
			Address entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new AddressDTO(entity);
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

	private void copyDtoToEntity(AddressDTO dto, Address entity) {
		entity.setPublicPlace(dto.getPublicPlace());
		entity.setNumber(dto.getNumber());
		entity.setComplement(dto.getComplement());
		entity.setZipCode(dto.getZipCode());
		entity.setDistrict(dto.getDistrict());
		
		entity.setCounty(countyRepository.getOne(dto.getCountyId()));
		
		entity.getStudents().clear();
		for (StudentDTO aluDto : dto.getStudents()) {
			Student student = studentRepository.getOne(aluDto.getEnrollment());
			entity.getStudents().add(student);
		}
	}	
}
