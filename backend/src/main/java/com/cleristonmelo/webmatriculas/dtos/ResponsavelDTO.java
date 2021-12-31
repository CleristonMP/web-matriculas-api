package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.entities.Responsavel;

public class ResponsavelDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@Size(min = 3, max = 15, message = "O nome do responsável deve ter entre 3 e 15 caracteres")
	@NotBlank(message = "Campo requerido")
	private String nome;
	
	@Size(min = 3, max = 15, message = "O sobrenome do responsável deve ter entre 3 e 15 caracteres")
	@NotBlank(message = "Campo requerido")
	private String sobrenome;
	
	@NotBlank(message = "Campo obrigatório")
	private String rgOuCpf;
	
	@NotBlank(message = "Campo obrigatório")
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
