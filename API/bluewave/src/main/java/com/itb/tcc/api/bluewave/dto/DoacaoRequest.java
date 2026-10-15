package com.itb.tcc.api.bluewave.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record DoacaoRequest(
        @NotBlank(message = "informe o nome")
        @Size(max = 150, message = "o nome deve ter no máximo 150 caracteres")
        String nome,

        @NotBlank(message = "informe o e-mail")
        @Email(message = "e-mail inválido")
        String email,

        @NotNull(message = "informe o valor")
        @DecimalMin(value = "0.01", message = "o valor deve ser maior que zero")
        BigDecimal valor,

        @NotBlank(message = "informe a forma de pagamento")
        @Size(max = 30, message = "a forma de pagamento deve ter no máximo 30 caracteres")
        String formaPagamento
) {
}
