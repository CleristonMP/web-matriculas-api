package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.cleristonmelo.webmatriculas.entities.Endereco;

public class EnderecoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String logradouro;
	private String numero;
	private String complemento;
	private String cep;
	private String bairro;

	private Long municipioId;

	private Set<AlunoDTO> alunos = new HashSet<>();
	
	public EnderecoDTO() {
	}
	
	public EnderecoDTO(Long id, String logradouro, String numero, String complemento, String cep, String bairro,
			Long municipioId) {
		super();
		this.id = id;
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.cep = cep;
		this.bairro = bairro;
		this.setMunicipioId(municipioId);
	}

	public EnderecoDTO(Endereco entity) {
		this.id = entity.getId();
		this.logradouro = entity.getLogradouro();
		this.numero = entity.getNumero();
		this.complemento = entity.getComplemento();
		this.cep = entity.getCep();
		this.bairro = entity.getBairro();
		this.municipioId = entity.getMunicipio().getId();
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

	public Long getMunicipioId() {
		return municipioId;
	}

	public void setMunicipioId(Long municipioId) {
		this.municipioId = municipioId;
	}

	public Set<AlunoDTO> getAlunos() {
		return alunos;
	}
}
