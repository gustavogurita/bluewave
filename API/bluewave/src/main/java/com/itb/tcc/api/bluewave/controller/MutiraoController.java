package com.itb.tcc.api.bluewave.controller;

import com.itb.tcc.api.bluewave.dto.MutiraoRequest;
import com.itb.tcc.api.bluewave.model.Mutirao;
import com.itb.tcc.api.bluewave.service.AuthService;
import com.itb.tcc.api.bluewave.service.MutiraoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * GET    /api/mutiroes        → lista (público)
 * GET    /api/mutiroes/{id}   → detalhes (público)
 * POST   /api/mutiroes        → cria (ADMIN)
 * PUT    /api/mutiroes/{id}   → edita (ADMIN)
 * DELETE /api/mutiroes/{id}   → exclui (ADMIN, apenas sem inscrições)
 */
@RestController
@RequestMapping("/api/mutiroes")
public class MutiraoController {

    private final MutiraoService mutiraoService;
    private final AuthService authService;

    public MutiraoController(MutiraoService mutiraoService, AuthService authService) {
        this.mutiraoService = mutiraoService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<Mutirao>> listar() {
        return ResponseEntity.ok(mutiraoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mutirao> buscar(@PathVariable Integer id) {
        return ResponseEntity.ok(mutiraoService.buscar(id));
    }

    @PostMapping
    public ResponseEntity<Mutirao> criar(
            @Valid @RequestBody MutiraoRequest requisicao,
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        authService.requireAdmin(authorization);
        return ResponseEntity.status(HttpStatus.CREATED).body(mutiraoService.salvar(requisicao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mutirao> editar(
            @PathVariable Integer id,
            @Valid @RequestBody MutiraoRequest requisicao,
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        authService.requireAdmin(authorization);
        return ResponseEntity.ok(mutiraoService.atualizar(id, requisicao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Integer id,
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        authService.requireAdmin(authorization);
        mutiraoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
