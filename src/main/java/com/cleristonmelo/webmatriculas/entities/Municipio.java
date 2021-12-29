package com.cleristonmelo.webmatriculas.entities;

import java.io.Serializable;
import java.util.Objects;

public class Municipio implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
	private String estado;
	
	public Municipio() {
	}

	public Municipio(Long id, String nome, String estado) {
		this.id = id;
		this.nome = nome;
		this.estado = estado;
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

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Municipio other = (Municipio) obj;
		return Objects.equals(id, other.id);
	}
}
