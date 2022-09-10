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

import com.cleristonmelo.webmatriculas.dtos.CountyDTO;
import com.cleristonmelo.webmatriculas.entities.County;
import com.cleristonmelo.webmatriculas.repositories.CountyRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class CountyService {
	
	@Autowired
	private CountyRepository repository;
	
	@Transactional(readOnly = true)
	public Page<CountyDTO> findAllPaged(Pageable pageable) {
		Page<County> page = repository.findAll(pageable);
		return page.map(x -> new CountyDTO(x));
	}
	
	@Transactional(readOnly = true)
	public CountyDTO findById(Long id) {
		Optional<County> obj = repository.findById(id);
		County entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new CountyDTO(entity);
	}
	
	@Transactional
	public CountyDTO insert(CountyDTO dto) {
		County entity = new County();
		
		entity.setName(dto.getName());
		entity.setState(dto.getState());
		
		entity = repository.save(entity);
		return new CountyDTO(entity);
	}

	@Transactional
	public CountyDTO update(Long id, CountyDTO dto) {
		try {
			County entity = repository.getOne(id);
			
			entity.setName(dto.getName());
			entity.setState(dto.getState());

			entity = repository.save(entity);
			return new CountyDTO(entity);
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
}
