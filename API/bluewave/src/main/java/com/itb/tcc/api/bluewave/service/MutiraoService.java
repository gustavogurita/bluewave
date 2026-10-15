package com.itb.tcc.api.bluewave.service;

import com.itb.tcc.api.bluewave.dto.MutiraoRequest;
import com.itb.tcc.api.bluewave.exception.ApiException;
import com.itb.tcc.api.bluewave.model.Mutirao;
import com.itb.tcc.api.bluewave.repository.MutiraoRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MutiraoService {

    private final MutiraoRepository mutiraoRepository;

    public MutiraoService(MutiraoRepository mutiraoRepository) {
        this.mutiraoRepository = mutiraoRepository;
    }

    @Transactional(readOnly = true)
    public List<Mutirao> listar() {
        return mutiraoRepository.findAllByOrderByDataAscHorarioAsc();
    }

    @Transactional(readOnly = true)
    public Mutirao buscar(Integer id) {
        return mutiraoRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Mutirão não encontrado."));
    }

    @Transactional
    public Mutirao salvar(MutiraoRequest requisicao) {
        validar(requisicao, null);

        Mutirao mutirao = new Mutirao();
        copiar(requisicao, mutirao);
        mutirao.setInscritos(0);

        return mutiraoRepository.save(mutirao);
    }

    @Transactional
    public Mutirao atualizar(Integer id, MutiraoRequest requisicao) {
        Mutirao mutirao = buscar(id);
        validar(requisicao, mutirao);
        copiar(requisicao, mutirao);

        return mutiraoRepository.save(mutirao);
    }

    @Transactional
    public void excluir(Integer id) {
        Mutirao mutirao = buscar(id);

        if (mutirao.getInscritos() != null && mutirao.getInscritos() > 0) {
            throw new ApiException(HttpStatus.CONFLICT,
                    "Não é possível excluir: já existem inscrições neste mutirão.");
        }

        mutiraoRepository.delete(mutirao);
    }

    private void copiar(MutiraoRequest requisicao, Mutirao mutirao) {
        mutirao.setTitulo(requisicao.titulo().trim());
        mutirao.setData(requisicao.data());
        mutirao.setHorario(requisicao.horario());
        mutirao.setLocalizacao(requisicao.localizacao().trim());
        mutirao.setVagas(requisicao.vagas());
        mutirao.setStatus(requisicao.status());
        mutirao.setDescricao(requisicao.descricao() == null ? null : requisicao.descricao().trim());
    }

    private void validar(MutiraoRequest requisicao, Mutirao existente) {
        if (requisicao.data().isBefore(LocalDate.now())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "A data não pode ser anterior à data atual.");
        }

        int inscritos = existente == null || existente.getInscritos() == null ? 0 : existente.getInscritos();
        if (requisicao.vagas() < inscritos) {
            throw new ApiException(HttpStatus.BAD_REQUEST,
                    "As vagas não podem ser menores que os inscritos (" + inscritos + ").");
        }
    }
}
