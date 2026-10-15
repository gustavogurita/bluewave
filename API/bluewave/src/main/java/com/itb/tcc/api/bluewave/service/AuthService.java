package com.itb.tcc.api.bluewave.service;

import com.itb.tcc.api.bluewave.dto.AuthResponse;
import com.itb.tcc.api.bluewave.dto.CadastroRequest;
import com.itb.tcc.api.bluewave.dto.LoginRequest;
import com.itb.tcc.api.bluewave.dto.UsuarioResponse;
import com.itb.tcc.api.bluewave.exception.ApiException;
import com.itb.tcc.api.bluewave.model.Usuario;
import com.itb.tcc.api.bluewave.repository.UsuarioRepository;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Login, cadastro e controle de sessão.
 *
 * A sessão usa um token simples (UUID) guardado em memória:
 * - Front guarda o token em localStorage e envia "Authorization: Bearer <token>"
 * - Ao reiniciar a API as sessões caem (ideal para TCC; depois pode virar JWT)
 */
@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final Map<String, Integer> sessoes = new ConcurrentHashMap<>();

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public AuthResponse login(LoginRequest requisicao) {
        Usuario usuario = usuarioRepository
                .findByUsername(requisicao.email().trim().toLowerCase())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "E-mail ou senha incorretos."));

        if (!encoder.matches(requisicao.senha(), usuario.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "E-mail ou senha incorretos.");
        }

        if (!"ATIVO".equalsIgnoreCase(usuario.getStatusUsuario())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Usuário inativo. Contate o administrador.");
        }

        String token = UUID.randomUUID().toString().replace("-", "");
        sessoes.put(token, usuario.getId());

        return new AuthResponse(token, montarResposta(usuario));
    }

    @Transactional
    public UsuarioResponse cadastrar(CadastroRequest requisicao) {
        String email = requisicao.email().trim().toLowerCase();

        if (usuarioRepository.existsByUsername(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "Já existe uma conta com este e-mail.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(requisicao.nome().trim());
        usuario.setUsername(email);
        usuario.setPassword(encoder.encode(requisicao.senha()));
        usuario.setNivelAcesso("USER");
        usuario.setStatusUsuario("ATIVO");
        usuario.setDataCadastro(LocalDateTime.now());

        usuarioRepository.save(usuario);
        return montarResposta(usuario);
    }

    /**
     * Resolve o usuário dono do token enviado no header Authorization.
     * Aceita "Bearer <token>" ou só o token.
     */
    public Usuario requireUsuario(String authorization) {
        if (authorization == null || authorization.isBlank()) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Faça login para continuar.");
        }

        String token = authorization.replaceFirst("(?i)^Bearer\\s+", "").trim();
        Integer usuarioId = sessoes.get(token);

        if (usuarioId == null) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Sessão inválida ou expirada. Entre novamente.");
        }

        return usuarioRepository
                .findById(usuarioId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Sessão inválida ou expirada. Entre novamente."));
    }

    /** Igual ao requireUsuario, mas exige nivelAcesso = ADMIN. */
    public Usuario requireAdmin(String authorization) {
        Usuario usuario = requireUsuario(authorization);

        if (!"ADMIN".equalsIgnoreCase(usuario.getNivelAcesso())) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Acesso restrito ao administrador.");
        }

        return usuario;
    }

    /** Usuário logado OU null (para endpoints que aceitam anônimo). */
    public Usuario usuarioOpcional(String authorization) {
        if (authorization == null || authorization.isBlank()) {
            return null;
        }
        return requireUsuario(authorization);
    }

    public UsuarioResponse montarResposta(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getUsername(),
                usuario.getNivelAcesso(),
                usuario.getStatusUsuario()
        );
    }
}
