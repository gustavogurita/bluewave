package com.itb.tcc.api.bluewave.controller;

import com.itb.tcc.api.bluewave.dto.DoacaoRequest;
import com.itb.tcc.api.bluewave.model.Doacao;
import com.itb.tcc.api.bluewave.repository.DoacaoRepository;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** POST /api/doacoes → formulário de doações da home. */
@RestController
@RequestMapping("/api/doacoes")
public class DoacaoController {

    private final DoacaoRepository doacaoRepository;

    public DoacaoController(DoacaoRepository doacaoRepository) {
        this.doacaoRepository = doacaoRepository;
    }

    @PostMapping
    public ResponseEntity<Doacao> registrar(@Valid @RequestBody DoacaoRequest requisicao) {
        Doacao doacao = new Doacao();
        doacao.setNome(requisicao.nome().trim());
        doacao.setEmail(requisicao.email().trim());
        doacao.setValor(requisicao.valor());
        doacao.setFormaPagamento(requisicao.formaPagamento().trim());
        doacao.setDataDoacao(LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.CREATED).body(doacaoRepository.save(doacao));
    }
}
