package com.cleristonmelo.webmatriculas.entities;

import java.io.Serializable;
import java.util.Objects;

public class Endereco implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String logradouro;
	private String numero;
	private String complemento;
	private String cep;
	private String bairro;
	
	private Municipio municipio;
	
	private Aluno aluno;
	
	public Endereco() {
	}

	public Endereco(Long id, String logradouro, String numero, String complemento, String cep, String bairro,
			Municipio municipio, Aluno aluno) {
		this.id = id;
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.setCep(cep);
		this.bairro = bairro;
		this.municipio = municipio;
		this.setAluno(aluno);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public Municipio getMunicipio() {
		return municipio;
	}

	public void setMunicipio(Municipio municipio) {
		this.municipio = municipio;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
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
		Endereco other = (Endereco) obj;
		return Objects.equals(id, other.id);
	}
}
