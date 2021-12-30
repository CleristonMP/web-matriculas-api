package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;

import com.cleristonmelo.webmatriculas.entities.Municipio;

public class MunicipioDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String estado;
	
	public MunicipioDTO() {
	}

	public MunicipioDTO(Long id, String nome, String estado) {
		this.id = id;
		this.nome = nome;
		this.estado = estado;
	}
	
	public MunicipioDTO(Municipio entity) {
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.estado = entity.getEstado();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}	
}
