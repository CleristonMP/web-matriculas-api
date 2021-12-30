package com.cleristonmelo.webmatriculas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cleristonmelo.webmatriculas.entities.Turma;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {

}
