package com.cleristonmelo.webmatriculas.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.cleristonmelo.webmatriculas.dtos.UsuarioInsertDTO;
import com.cleristonmelo.webmatriculas.entities.Usuario;
import com.cleristonmelo.webmatriculas.repositories.UsuarioRepository;
import com.cleristonmelo.webmatriculas.resources.exceptions.FieldMessage;

public class UsuarioInsertValidator implements ConstraintValidator<UsuarioInsertValid, UsuarioInsertDTO> {

	@Autowired
	private UsuarioRepository repository;
	
	@Override
	public void initialize(UsuarioInsertValid ann) {
	}

	@Override
	public boolean isValid(UsuarioInsertDTO dto, ConstraintValidatorContext context) {
		List<FieldMessage> list = new ArrayList<>();

		Usuario usuario = repository.findByEmail(dto.getEmail());

		if (usuario != null) {
			list.add(new FieldMessage("email", "E-mail já existe"));
		}

		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}
