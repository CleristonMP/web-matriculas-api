package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

import com.cleristonmelo.webmatriculas.entities.Aluno;

public class AlunoDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long matricula;
	
	@Size(min = 3, max = 15, message = "O nome do aluno deve ter entre 3 e 15 caracteres")
	@NotBlank(message = "Campo requerido")
	private String nome;
	
	@Size(min = 3, max = 15, message = "O sobrenome do aluno deve ter entre 3 e 15 caracteres")
	@NotBlank(message = "Campo requerido")
	private String sobrenome;
	private String rgOuCpf;
	
	@PastOrPresent(message = "A data de nascimento não pode ser futura")
	private Date dataNascimento;

	private Long enderecoId;

	private Long turmaId;

	private Long responsavelId;
	
	public AlunoDTO() {
	}
	
	public AlunoDTO(Long matricula, String nome, String sobrenome, String rgOuCpf, Date dataNascimento, Long enderecoId,
			Long turmaId, Long responsavelId) {
		super();
		this.matricula = matricula;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.rgOuCpf = rgOuCpf;
		this.dataNascimento = dataNascimento;
		this.enderecoId = enderecoId;
		this.turmaId = turmaId;
		this.responsavelId = responsavelId;
	}



	public AlunoDTO(Aluno entity) {
		this.matricula = entity.getMatricula();
		this.nome = entity.getNome();
		this.sobrenome = entity.getSobrenome();
		this.rgOuCpf = entity.getRgOuCpf();
		this.dataNascimento = entity.getDataNascimento();
		this.enderecoId = entity.getEndereco().getId();
		this.turmaId = entity.getTurma().getId();
		this.responsavelId = entity.getResponsavel().getId();
	}

	public Long getMatricula() {
		return matricula;
	}

	public void setMatricula(Long matricula) {
		this.matricula = matricula;
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

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public Long getEnderecoId() {
		return enderecoId;
	}

	public void setEnderecoId(Long enderecoId) {
		this.enderecoId = enderecoId;
	}

	public Long getTurmaId() {
		return turmaId;
	}

	public void setTurmaId(Long turmaId) {
		this.turmaId = turmaId;
	}

	public Long getResponsavelId() {
		return responsavelId;
	}

	public void setResponsavelId(Long responsavelId) {
		this.responsavelId = responsavelId;
	}
}
