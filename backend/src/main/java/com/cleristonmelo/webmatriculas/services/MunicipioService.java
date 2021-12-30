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

import com.cleristonmelo.webmatriculas.dtos.MunicipioDTO;
import com.cleristonmelo.webmatriculas.entities.Municipio;
import com.cleristonmelo.webmatriculas.repositories.MunicipioRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class MunicipioService {
	
	@Autowired
	private MunicipioRepository repository;
	
	@Transactional(readOnly = true)
	public Page<MunicipioDTO> findAllPaged(Pageable pageable) {
		Page<Municipio> page = repository.findAll(pageable);
		return page.map(x -> new MunicipioDTO(x));
	}
	
	@Transactional(readOnly = true)
	public MunicipioDTO findById(Long id) {
		Optional<Municipio> obj = repository.findById(id);
		Municipio entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new MunicipioDTO(entity);
	}
	
	@Transactional
	public MunicipioDTO insert(MunicipioDTO dto) {
		Municipio entity = new Municipio();
		
		entity.setNome(dto.getNome());
		entity.setEstado(dto.getEstado());
		
		entity = repository.save(entity);
		return new MunicipioDTO(entity);
	}

	@Transactional
	public MunicipioDTO update(Long id, MunicipioDTO dto) {
		try {
			Municipio entity = repository.getOne(id);
			
			entity.setNome(dto.getNome());
			entity.setEstado(dto.getEstado());

			entity = repository.save(entity);
			return new MunicipioDTO(entity);
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
