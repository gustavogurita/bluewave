package com.itb.tcc.api.bluewave.controller;

import com.itb.tcc.api.bluewave.dto.AuthResponse;
import com.itb.tcc.api.bluewave.dto.CadastroRequest;
import com.itb.tcc.api.bluewave.dto.LoginRequest;
import com.itb.tcc.api.bluewave.dto.UsuarioResponse;
import com.itb.tcc.api.bluewave.model.Usuario;
import com.itb.tcc.api.bluewave.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * POST /api/auth/login    → autentica e devolve token
 * POST /api/auth/cadastro → cria conta (nivelAcesso USER)
 * GET  /api/auth/perfil   → usuário do token enviado no header Authorization
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest requisicao) {
        return ResponseEntity.ok(authService.login(requisicao));
    }

    @PostMapping("/cadastro")
    public ResponseEntity<UsuarioResponse> cadastro(@Valid @RequestBody CadastroRequest requisicao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.cadastrar(requisicao));
    }

    @GetMapping("/perfil")
    public ResponseEntity<UsuarioResponse> perfil(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        Usuario usuario = authService.requireUsuario(authorization);
        return ResponseEntity.ok(authService.montarResposta(usuario));
    }
}
