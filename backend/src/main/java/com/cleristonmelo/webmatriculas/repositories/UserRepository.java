package com.cleristonmelo.webmatriculas.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cleristonmelo.webmatriculas.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT obj FROM User obj WHERE (LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')) "
			+ "OR LOWER(obj.lastName) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<User> find(Pageable pageable, String name);

	User findByEmail(String email);
}
