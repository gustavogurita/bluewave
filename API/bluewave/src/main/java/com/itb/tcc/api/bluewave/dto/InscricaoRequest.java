package com.itb.tcc.api.bluewave.dto;

import jakarta.validation.constraints.NotNull;

/**
 * nome e email são obrigatórios apenas quando o usuário NÃO está logado
 * (o service decide: logado usa os dados da conta).
 */
public record InscricaoRequest(
        @NotNull(message = "informe o mutirão")
        Integer mutiraoId,

        String nome,

        String email
) {
}
