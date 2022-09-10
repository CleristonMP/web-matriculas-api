package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.cleristonmelo.webmatriculas.entities.County;

public class CountyDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String name;
	
	@NotBlank(message = "Campo obrigatório")
	private String state;
	
	public CountyDTO() {
	}

	public CountyDTO(Long id, String name, String state) {
		this.id = id;
		this.name = name;
		this.state = state;
	}
	
	public CountyDTO(County entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.state = entity.getState();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getState() {
		return state;
	}

	public void setEstado(String state) {
		this.state = state;
	}	
}
