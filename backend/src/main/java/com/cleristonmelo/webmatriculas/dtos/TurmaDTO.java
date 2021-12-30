package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.entities.Turma;

public class TurmaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String periodo;

	private Set<AlunoDTO> alunos = new HashSet<>();
	
	public TurmaDTO() {
	}

	public TurmaDTO(Long id, String nome, String periodo) {
		this.id = id;
		this.nome = nome;
		this.periodo = periodo;
	}
	
	public TurmaDTO(Turma entity) {
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.periodo = entity.getPeriodo();
	}
	
	public TurmaDTO(Turma entity, Set<Aluno> alunos) {
		this(entity);
		alunos.forEach(aluno -> this.alunos.add(new AlunoDTO(aluno)));
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

	public Set<AlunoDTO> getAlunos() {
		return alunos;
	}
}
