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
import com.cleristonmelo.webmatriculas.dtos.EnderecoDTO;
import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.entities.Endereco;
import com.cleristonmelo.webmatriculas.repositories.AlunoRepository;
import com.cleristonmelo.webmatriculas.repositories.EnderecoRepository;
import com.cleristonmelo.webmatriculas.repositories.MunicipioRepository;
import com.cleristonmelo.webmatriculas.services.exceptions.DatabaseException;
import com.cleristonmelo.webmatriculas.services.exceptions.ResourceNotFoundException;

@Service
public class EnderecoService {
	
	@Autowired
	private EnderecoRepository repository;
	
	@Autowired
	private AlunoRepository alunoRepository;
	
	@Autowired
	private MunicipioRepository municipioRepository;
	
	@Transactional(readOnly = true)
	public Page<EnderecoDTO> findAllPaged(Pageable pageable) {
		Page<Endereco> page = repository.findAll(pageable);
		return page.map(x -> new EnderecoDTO(x));
	}
	
	@Transactional(readOnly = true)
	public EnderecoDTO findById(Long id) {
		Optional<Endereco> obj = repository.findById(id);
		Endereco entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new EnderecoDTO(entity, entity.getAlunos());
	}
	
	@Transactional
	public EnderecoDTO insert(EnderecoDTO dto) {
		Endereco entity = new Endereco();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new EnderecoDTO(entity);
	}

	@Transactional
	public EnderecoDTO update(Long id, EnderecoDTO dto) {
		try {
			Endereco entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new EnderecoDTO(entity);
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
	

	private void copyDtoToEntity(EnderecoDTO dto, Endereco entity) {
		entity.setLogradouro(dto.getLogradouro());
		entity.setNumero(dto.getNumero());
		entity.setComplemento(dto.getComplemento());
		entity.setCep(dto.getCep());
		entity.setBairro(dto.getBairro());
		
		entity.setMunicipio(municipioRepository.getOne(dto.getMunicipioId()));
		
		entity.getAlunos().clear();
		for (AlunoDTO aluDto : dto.getAlunos()) {
			Aluno aluno = alunoRepository.getOne(aluDto.getMatricula());
			entity.getAlunos().add(aluno);
		}
	}	
}
