package com.itb.tcc.api.bluewave.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CadastroRequest(
        @NotBlank(message = "informe seu nome")
        @Size(min = 3, max = 254, message = "o nome deve ter entre 3 e 254 caracteres")
        String nome,

        @NotBlank(message = "informe o e-mail")
        @Email(message = "e-mail inválido")
        String email,

        @NotBlank(message = "informe a senha")
        @Size(min = 6, max = 100, message = "a senha deve ter no mínimo 6 caracteres")
        String senha
) {
}
