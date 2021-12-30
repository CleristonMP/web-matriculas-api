package com.cleristonmelo.webmatriculas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cleristonmelo.webmatriculas.entities.Municipio;

@Repository
public interface MunicipioRepository extends JpaRepository<Municipio, Long> {

}
