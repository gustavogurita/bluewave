package com.itb.tcc.api.bluewave.repository;

import com.itb.tcc.api.bluewave.model.Inscricao;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscricaoRepository extends JpaRepository<Inscricao, Integer> {

    List<Inscricao> findByMutiraoIdOrderByDataInscricaoDesc(Integer mutiraoId);

    boolean existsByUsuarioIdAndMutiraoId(Integer usuarioId, Integer mutiraoId);
}
