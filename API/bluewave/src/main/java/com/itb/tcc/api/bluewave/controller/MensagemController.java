package com.itb.tcc.api.bluewave.controller;

import com.itb.tcc.api.bluewave.dto.MensagemRequest;
import com.itb.tcc.api.bluewave.model.Mensagem;
import com.itb.tcc.api.bluewave.repository.MensagemRepository;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** POST /api/mensagens → formulário de contato da home. */
@RestController
@RequestMapping("/api/mensagens")
public class MensagemController {

    private final MensagemRepository mensagemRepository;

    public MensagemController(MensagemRepository mensagemRepository) {
        this.mensagemRepository = mensagemRepository;
    }

    @PostMapping
    public ResponseEntity<Mensagem> enviar(@Valid @RequestBody MensagemRequest requisicao) {
        Mensagem mensagem = new Mensagem();
        mensagem.setEmissor(requisicao.emissor().trim());
        mensagem.setEmail(requisicao.email().trim());
        mensagem.setTelefone(requisicao.telefone() == null ? null : requisicao.telefone().trim());
        mensagem.setTexto(requisicao.texto().trim());
        mensagem.setDataMensagem(LocalDateTime.now());
        mensagem.setStatusMensagem("ATIVO");

        return ResponseEntity.status(HttpStatus.CREATED).body(mensagemRepository.save(mensagem));
    }
}
