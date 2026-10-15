package com.itb.tcc.api.bluewave.repository;

import com.itb.tcc.api.bluewave.model.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsername(String username);

    boolean existsByUsername(String username);
}
