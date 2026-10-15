package com.itb.tcc.api.bluewave.exception;

import org.springframework.http.HttpStatus;

/**
 * Erro de negócio da API (ex.: 401 no login, 409 sem vagas).
 * O ApiExceptionHandler converte isso em JSON { "erro": "..." }.
 */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String mensagem) {
        super(mensagem);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
