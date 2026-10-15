package com.itb.tcc.api.bluewave.controller;

import com.itb.tcc.api.bluewave.dto.InscricaoRequest;
import com.itb.tcc.api.bluewave.model.Inscricao;
import com.itb.tcc.api.bluewave.model.Usuario;
import com.itb.tcc.api.bluewave.service.AuthService;
import com.itb.tcc.api.bluewave.service.InscricaoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * POST /api/inscricoes                     → inscreve (logado ou anônimo)
 * GET  /api/mutiroes/{id}/inscricoes       → lista do mutirão (ADMIN)
 *     (implementado aqui para ficar em /api/inscricoes/mutirao/{id})
 */
@RestController
@RequestMapping("/api/inscricoes")
public class InscricaoController {

    private final InscricaoService inscricaoService;
    private final AuthService authService;

    public InscricaoController(InscricaoService inscricaoService, AuthService authService) {
        this.inscricaoService = inscricaoService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<Inscricao> inscrever(
            @Valid @RequestBody InscricaoRequest requisicao,
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        Usuario usuario = authService.usuarioOpcional(authorization);
        Inscricao inscricao = inscricaoService.inscrever(requisicao, usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(inscricao);
    }

    @GetMapping("/mutirao/{mutiraoId}")
    public ResponseEntity<List<Inscricao>> listarPorMutirao(
            @PathVariable Integer mutiraoId,
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        authService.requireAdmin(authorization);
        return ResponseEntity.ok(inscricaoService.listarPorMutirao(mutiraoId));
    }
}
