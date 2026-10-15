package com.itb.tcc.api.bluewave.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * Tabela Mensagem do bd_bluewave.sql (formulário de contato).
 */
@Entity
@Table(name = "Mensagem")
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "dataMensagem", nullable = false)
    private LocalDateTime dataMensagem;

    @Column(name = "emissor", nullable = false, length = 100)
    private String emissor;

    @Column(name = "email", nullable = false, length = 254)
    private String email;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @Column(name = "texto", nullable = false, length = 400)
    private String texto;

    @Column(name = "dataAtualizacao")
    private LocalDateTime dataAtualizacao;

    @Column(name = "statusMensagem", nullable = false, length = 10)
    private String statusMensagem = "ATIVO";

    @PrePersist
    private void antesPersistir() {
        if (dataMensagem == null) {
            dataMensagem = LocalDateTime.now();
        }
        if (statusMensagem == null || statusMensagem.isBlank()) {
            statusMensagem = "ATIVO";
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDataMensagem() {
        return dataMensagem;
    }

    public void setDataMensagem(LocalDateTime dataMensagem) {
        this.dataMensagem = dataMensagem;
    }

    public String getEmissor() {
        return emissor;
    }

    public void setEmissor(String emissor) {
        this.emissor = emissor;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public String getStatusMensagem() {
        return statusMensagem;
    }

    public void setStatusMensagem(String statusMensagem) {
        this.statusMensagem = statusMensagem;
    }
}
