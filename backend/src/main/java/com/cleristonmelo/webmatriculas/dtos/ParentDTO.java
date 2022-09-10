package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.cleristonmelo.webmatriculas.entities.Student;
import com.cleristonmelo.webmatriculas.entities.Parent;

public class ParentDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@Size(min = 3, max = 15, message = "O nome do responsável deve ter entre 3 e 15 caracteres")
	@NotBlank(message = "Campo requerido")
	private String name;
	
	@Size(min = 3, max = 15, message = "O sobrenome do responsável deve ter entre 3 e 15 caracteres")
	@NotBlank(message = "Campo requerido")
	private String lastName;
	
	@NotBlank(message = "Campo obrigatório")
	private String cpf;
	
	@NotBlank(message = "Campo obrigatório")
	private String phone;

	private Set<StudentDTO> students = new HashSet<>();
	
	public ParentDTO() {
	}

	public ParentDTO(Long id, String name, String lastName, String cpf, String phone) {
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.cpf = cpf;
		this.phone = phone;
	}
	
	public ParentDTO(Parent entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.lastName = entity.getLastName();
		this.cpf = entity.getCpf();
		this.phone = entity.getPhone();
	}
	
	public ParentDTO(Parent entity, Set<Student> students) {
		this(entity);
		students.forEach(student -> this.students.add(new StudentDTO(student)));
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

	public void setNome(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setSobrenome(String lastName) {
		this.lastName = lastName;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getPhone() {
		return phone;
	}

	public void setTelefone(String phone) {
		this.phone = phone;
	}

	public Set<StudentDTO> getStudents() {
		return students;
	}
}
