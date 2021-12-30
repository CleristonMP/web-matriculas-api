package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.entities.Responsavel;

public class ResponsavelDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String sobrenome;
	private String rgOuCpf;
	private String telefone;

	private Set<AlunoDTO> alunos = new HashSet<>();
	
	public ResponsavelDTO() {
	}

	public ResponsavelDTO(Long id, String nome, String sobrenome, String rgOuCpf, String telefone) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.rgOuCpf = rgOuCpf;
		this.telefone = telefone;
	}
	
	public ResponsavelDTO(Responsavel entity) {
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.sobrenome = entity.getSobrenome();
		this.rgOuCpf = entity.getRgOuCpf();
		this.telefone = entity.getTelefone();
	}
	
	public ResponsavelDTO(Responsavel entity, Set<Aluno> alunos) {
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

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public Set<AlunoDTO> getAlunos() {
		return alunos;
	}
}
