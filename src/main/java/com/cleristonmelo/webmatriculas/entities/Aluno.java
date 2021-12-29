package com.cleristonmelo.webmatriculas.entities;

import java.io.Serializable;
import java.util.Objects;

public class Aluno implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
	private String sobrenome;
	private String cpf;
	private Integer matricula;
	
	private Endereco endereco;
	
	private Turma turma;
	
	public Aluno() {
	}

	public Aluno(Long id, String nome, String sobrenome, String cpf, Integer matricula, Endereco endereco,
			Turma turma) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.cpf = cpf;
		this.matricula = matricula;
		this.endereco = endereco;
		this.setTurma(turma);
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Integer getMatricula() {
		return matricula;
	}

	public void setMatricula(Integer matricula) {
		this.matricula = matricula;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public Turma getTurma() {
		return turma;
	}

	public void setTurma(Turma turma) {
		this.turma = turma;
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
		Aluno other = (Aluno) obj;
		return Objects.equals(id, other.id);
	}
}
