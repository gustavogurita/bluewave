package com.itb.tcc.api.bluewave.repository;

import com.itb.tcc.api.bluewave.model.Mutirao;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MutiraoRepository extends JpaRepository<Mutirao, Integer> {

    List<Mutirao> findAllByOrderByDataAscHorarioAsc();
}
