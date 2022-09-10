package com.cleristonmelo.webmatriculas.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;

import com.cleristonmelo.webmatriculas.entities.Student;
import com.cleristonmelo.webmatriculas.entities.Address;

public class AddressDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo obrigatório")
	private String publicPlace;

	private String number;
	private String complement;
	private String zipCode;

	@NotBlank(message = "Campo obrigatório")
	private String district;

	private Long countyId;

	private Set<StudentDTO> students = new HashSet<>();

	public AddressDTO() {
	}

	public AddressDTO(Long id, String publicPlace, String number, String complement, String zipCode, String district,
			Long countyId) {
		this.id = id;
		this.publicPlace = publicPlace;
		this.number = number;
		this.complement = complement;
		this.zipCode = zipCode;
		this.district = district;
		this.setCountyId(countyId);
	}

	public AddressDTO(Address entity) {
		this.id = entity.getId();
		this.publicPlace = entity.getPublicPlace();
		this.number = entity.getNumber();
		this.complement = entity.getComplement();
		this.zipCode = entity.getZipCode();
		this.district = entity.getDistrict();
		this.countyId = entity.getCounty().getId();
	}

	public AddressDTO(Address entity, Set<Student> alunos) {
		this(entity);
		alunos.forEach(student -> this.students.add(new StudentDTO(student)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPublicPlace() {
		return publicPlace;
	}

	public void setPublicPlace(String publicPlace) {
		this.publicPlace = publicPlace;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public Long getCountyId() {
		return countyId;
	}

	public void setCountyId(Long countyId) {
		this.countyId = countyId;
	}

	public Set<StudentDTO> getStudents() {
		return students;
	}
}
