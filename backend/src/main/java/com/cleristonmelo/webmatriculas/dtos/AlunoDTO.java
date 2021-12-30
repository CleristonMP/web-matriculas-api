package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.Date;

import com.cleristonmelo.webmatriculas.entities.Aluno;
import com.cleristonmelo.webmatriculas.entities.Endereco;
import com.cleristonmelo.webmatriculas.entities.Responsavel;
import com.cleristonmelo.webmatriculas.entities.Turma;

public class AlunoDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long matricula;
	private String nome;
	private String sobrenome;
	private String rgOuCpf;
	private Date dataNascimento;

	private Endereco endereco;

	private Turma turma;

	private Responsavel responsavel;
	
	public AlunoDTO() {
	}

	public AlunoDTO(Long matricula, String nome, String sobrenome, String rgOuCpf, Date dataNascimento,
			Endereco endereco, Turma turma, Responsavel responsavel) {
		this.matricula = matricula;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.rgOuCpf = rgOuCpf;
		this.dataNascimento = dataNascimento;
		this.endereco = endereco;
		this.turma = turma;
		this.responsavel = responsavel;
	}
	
	public AlunoDTO(Aluno entity) {
		this.matricula = entity.getMatricula();
		this.nome = entity.getNome();
		this.sobrenome = entity.getSobrenome();
		this.rgOuCpf = entity.getRgOuCpf();
		this.dataNascimento = entity.getDataNascimento();
		this.endereco = entity.getEndereco();
		this.turma = entity.getTurma();
		this.responsavel = entity.getResponsavel();
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

	public Responsavel getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(Responsavel responsavel) {
		this.responsavel = responsavel;
	}
}
