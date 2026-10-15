package com.itb.tcc.api.bluewave.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

/**
 * Converte exceções da API em respostas JSON padronizadas:
 * { "erro": "mensagem" }
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, String>> tratarApi(ApiException e) {
        Map<String, String> corpo = new HashMap<>();
        corpo.put("erro", e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(corpo);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> tratarValidacao(MethodArgumentNotValidException e) {
        String mensagem = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(erro -> erro.getField() + ": " + erro.getDefaultMessage())
                .orElse("Dados inválidos.");

        Map<String, String> corpo = new HashMap<>();
        corpo.put("erro", mensagem);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(corpo);
    }

    /**
     * URL inexistente (ex.: digitar /api/mutiroe sem o "s") →
     * responde JSON amigável em vez da página padrão com stack trace.
     */
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Map<String, String>> tratarRotaInexistente(NoResourceFoundException e) {
        Map<String, String> corpo = new HashMap<>();
        corpo.put("erro", "Rota não encontrada. Verifique o endereço. Exemplo correto: /api/mutiroes");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(corpo);
    }
}
