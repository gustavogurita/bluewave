package com.itb.tcc.api.bluewave.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

public record MutiraoRequest(
        @NotBlank(message = "informe o título")
        @Size(max = 150, message = "o título deve ter no máximo 150 caracteres")
        String titulo,

        @NotNull(message = "informe a data")
        LocalDate data,

        @NotNull(message = "informe o horário")
        LocalTime horario,

        @NotBlank(message = "informe a localização")
        @Size(max = 150, message = "a localização deve ter no máximo 150 caracteres")
        String localizacao,

        @NotNull(message = "informe a quantidade de vagas")
        @Min(value = 1, message = "as vagas devem ser no mínimo 1")
        Integer vagas,

        @NotBlank(message = "informe o status")
        @Pattern(regexp = "aberto|alerta|fechado", message = "status deve ser aberto, alerta ou fechado")
        String status,

        @Size(max = 500, message = "a descrição deve ter no máximo 500 caracteres")
        String descricao
) {
}
