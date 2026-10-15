package com.itb.tcc.api.bluewave.service;

import com.itb.tcc.api.bluewave.dto.InscricaoRequest;
import com.itb.tcc.api.bluewave.exception.ApiException;
import com.itb.tcc.api.bluewave.model.Inscricao;
import com.itb.tcc.api.bluewave.model.Mutirao;
import com.itb.tcc.api.bluewave.model.Usuario;
import com.itb.tcc.api.bluewave.repository.InscricaoRepository;
import com.itb.tcc.api.bluewave.repository.MutiraoRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InscricaoService {

    private final InscricaoRepository inscricaoRepository;
    private final MutiraoRepository mutiraoRepository;

    public InscricaoService(InscricaoRepository inscricaoRepository, MutiraoRepository mutiraoRepository) {
        this.inscricaoRepository = inscricaoRepository;
        this.mutiraoRepository = mutiraoRepository;
    }

    /**
     * Cria a inscrição e incrementa mutirao.inscritos (mesma transação).
     * usuario pode ser null (inscrição anônima pelo formulário).
     */
    @Transactional
    public Inscricao inscrever(InscricaoRequest requisicao, Usuario usuario) {
        Mutirao mutirao = mutiraoRepository.findById(requisicao.mutiraoId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Mutirão não encontrado."));

        if ("fechado".equalsIgnoreCase(mutirao.getStatus())) {
            throw new ApiException(HttpStatus.CONFLICT, "As inscrições para este mutirão estão encerradas.");
        }

        if (mutirao.getInscritos() >= mutirao.getVagas()) {
            throw new ApiException(HttpStatus.CONFLICT, "Não há vagas disponíveis neste mutirão.");
        }

        Inscricao inscricao = new Inscricao();
        inscricao.setMutirao(mutirao);
        inscricao.setStatus("CONFIRMADO");
        inscricao.setDataInscricao(LocalDateTime.now());

        if (usuario != null) {
            if (inscricaoRepository.existsByUsuarioIdAndMutiraoId(usuario.getId(), mutirao.getId())) {
                throw new ApiException(HttpStatus.CONFLICT, "Você já está inscrito neste mutirão.");
            }
            inscricao.setUsuario(usuario);
            inscricao.setNome(usuario.getNome());
            inscricao.setEmail(usuario.getUsername());
        } else {
            if (requisicao.nome() == null || requisicao.nome().isBlank()
                    || requisicao.email() == null || requisicao.email().isBlank()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "Informe seu nome e e-mail para se inscrever.");
            }
            inscricao.setNome(requisicao.nome().trim());
            inscricao.setEmail(requisicao.email().trim());
        }

        Inscricao salva = inscricaoRepository.save(inscricao);

        mutirao.setInscritos(mutirao.getInscritos() + 1);
        mutiraoRepository.save(mutirao);

        return salva;
    }

    @Transactional(readOnly = true)
    public List<Inscricao> listarPorMutirao(Integer mutiraoId) {
        return inscricaoRepository.findByMutiraoIdOrderByDataInscricaoDesc(mutiraoId);
    }
}
