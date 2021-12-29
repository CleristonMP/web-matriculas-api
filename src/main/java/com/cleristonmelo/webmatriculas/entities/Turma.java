package com.cleristonmelo.webmatriculas.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Turma implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
	private String periodo;
	
	private Set<Aluno> alunos = new HashSet<>();
	
	public Turma() {
	}

	public Turma(Long id, String nome, String periodo) {
		this.id = id;
		this.nome = nome;
		this.periodo = periodo;
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

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public Set<Aluno> getAlunos() {
		return alunos;
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
		Turma other = (Turma) obj;
		return Objects.equals(id, other.id);
	}
}
