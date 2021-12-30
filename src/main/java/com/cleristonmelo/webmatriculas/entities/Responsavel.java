package com.cleristonmelo.webmatriculas.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Responsavel implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
	private String sobrenome;
	private String rgOuCpf;
	private Integer telefone;
	
	private Set<Aluno> alunos = new HashSet<>();
	
	public Responsavel() {
	}

	public Responsavel(Long id, String nome, String sobrenome, String rgOuCpf, Integer telefone) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.rgOuCpf = rgOuCpf;
		this.telefone = telefone;
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

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	public String getRgOuCpf() {
		return rgOuCpf;
	}

	public void setRgOuCpf(String rgOuCpf) {
		this.rgOuCpf = rgOuCpf;
	}

	public Integer getTelefone() {
		return telefone;
	}

	public void setTelefone(Integer telefone) {
		this.telefone = telefone;
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
		Responsavel other = (Responsavel) obj;
		return Objects.equals(id, other.id);
	}
}
