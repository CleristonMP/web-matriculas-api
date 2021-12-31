package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;

import com.cleristonmelo.webmatriculas.entities.Cargo;

public class CargoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String autoridade;
	
	public CargoDTO() {
	}

	public CargoDTO(Long id, String autoridade) {
		this.id = id;
		this.autoridade = autoridade;
	}
	
	public CargoDTO(Cargo cargo) {
		this.id = cargo.getId();
		this.autoridade = cargo.getAutoridade();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAutoridade() {
		return autoridade;
	}

	public void setAutoridade(String autoridade) {
		this.autoridade = autoridade;
	}
}
