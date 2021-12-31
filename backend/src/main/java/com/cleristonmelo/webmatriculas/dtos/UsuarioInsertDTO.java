package com.cleristonmelo.webmatriculas.dtos;

import com.cleristonmelo.webmatriculas.validation.UsuarioInsertValid;

@UsuarioInsertValid
public class UsuarioInsertDTO extends UsuarioDTO {
	private static final long serialVersionUID = 1L;

	private String senha;

	public UsuarioInsertDTO() {
		super();
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
}
