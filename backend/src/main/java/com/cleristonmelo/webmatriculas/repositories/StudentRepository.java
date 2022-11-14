package com.cleristonmelo.webmatriculas.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cleristonmelo.webmatriculas.entities.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	
	@Query("SELECT obj FROM Student obj "
			+ "WHERE (COALESCE(:schoolClassId) IS NULL OR obj.schoolClass.id = :schoolClassId) "
			+ "AND (LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')) OR "
			+ "LOWER(obj.lastName) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<Student> find(Pageable pageable, Long schoolClassId, String name);
}
