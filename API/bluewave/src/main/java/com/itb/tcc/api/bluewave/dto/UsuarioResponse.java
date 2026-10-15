package com.itb.tcc.api.bluewave.dto;

/** Dados públicos do usuário (nunca retorna o hash da senha). */
public record UsuarioResponse(
        Integer id,
        String nome,
        String email,
        String nivelAcesso,
        String statusUsuario
) {
}
