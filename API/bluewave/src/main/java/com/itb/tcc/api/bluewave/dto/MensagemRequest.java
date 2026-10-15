package com.itb.tcc.api.bluewave.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MensagemRequest(
        @NotBlank(message = "informe seu nome")
        @Size(max = 100, message = "o nome deve ter no máximo 100 caracteres")
        String emissor,

        @NotBlank(message = "informe o e-mail")
        @Email(message = "e-mail inválido")
        String email,

        @Size(max = 20, message = "o telefone deve ter no máximo 20 caracteres")
        String telefone,

        @NotBlank(message = "escreva sua mensagem")
        @Size(max = 400, message = "a mensagem deve ter no máximo 400 caracteres")
        String texto
) {
}
