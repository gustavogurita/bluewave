package com.itb.tcc.api.bluewave.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Tabela Doacao do bd_bluewave.sql (formulário de doações da home).
 */
@Entity
@Table(name = "Doacao")
public class Doacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "valor", nullable = false)
    private BigDecimal valor;

    @Column(name = "formaPagamento", nullable = false, length = 30)
    private String formaPagamento;

    @Column(name = "dataDoacao", nullable = false)
    private LocalDateTime dataDoacao;

    @PrePersist
    private void antesPersistir() {
        if (dataDoacao == null) {
            dataDoacao = LocalDateTime.now();
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public LocalDateTime getDataDoacao() {
        return dataDoacao;
    }

    public void setDataDoacao(LocalDateTime dataDoacao) {
        this.dataDoacao = dataDoacao;
    }
}
