package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

import com.cleristonmelo.webmatriculas.entities.Student;
import com.fasterxml.jackson.annotation.JsonFormat;

public class StudentDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long enrollment;

	@Size(min = 3, max = 15, message = "O nome do aluno deve ter entre 3 e 15 caracteres")
	@NotBlank(message = "Campo requerido")
	private String name;

	@Size(min = 3, max = 15, message = "O sobrenome do aluno deve ter entre 3 e 15 caracteres")
	@NotBlank(message = "Campo requerido")
	private String lastName;
	private String cpf;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
	@PastOrPresent(message = "A data de nascimento não pode ser futura")
	private Date birthDate;

	private Long addressId;

	private Long schoolClassId;

	private Long parentId;

	public StudentDTO() {
	}

	public StudentDTO(Long enrollment, String name, String lastName, String cpf, Date birthDate, Long addressId,
			Long schoolClassId, Long parentId) {
		this.enrollment = enrollment;
		this.name = name;
		this.lastName = lastName;
		this.cpf = cpf;
		this.birthDate = birthDate;
		this.addressId = addressId;
		this.schoolClassId = schoolClassId;
		this.parentId = parentId;
	}

	public StudentDTO(Student entity) {
		this.enrollment = entity.getEnrollment();
		this.name = entity.getName();
		this.lastName = entity.getLastName();
		this.cpf = entity.getCpf();
		this.birthDate = entity.getBirthDate();
		this.addressId = entity.getAddress().getId();
		this.schoolClassId = entity.getSchoolClass().getId();
		this.parentId = entity.getParent().getId();
	}

	public Long getEnrollment() {
		return enrollment;
	}

	public void setEnrollment(Long enrollment) {
		this.enrollment = enrollment;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public Long getAddressId() {
		return addressId;
	}

	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}

	public Long getSchoolClassId() {
		return schoolClassId;
	}

	public void setSchoolClassId(Long schoolClassId) {
		this.schoolClassId = schoolClassId;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
}
