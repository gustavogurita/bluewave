package com.itb.tcc.api.bluewave.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Tabela Mutirao do bd_bluewave.sql.
 * status: aberto / alerta / fechado.
 */
@Entity
@Table(name = "Mutirao")
public class Mutirao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "titulo", nullable = false, length = 150)
    private String titulo;

    @Column(name = "data", nullable = false)
    private LocalDate data;

    @Column(name = "horario", nullable = false)
    private LocalTime horario;

    @Column(name = "localizacao", nullable = false, length = 150)
    private String localizacao;

    @Column(name = "vagas", nullable = false)
    private Integer vagas;

    @Column(name = "inscritos", nullable = false)
    private Integer inscritos = 0;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "aberto";

    @Column(name = "descricao", length = 500)
    private String descricao;

    @PrePersist
    private void antesPersistir() {
        if (inscritos == null) {
            inscritos = 0;
        }
        if (status == null || status.isBlank()) {
            status = "aberto";
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Integer getVagas() {
        return vagas;
    }

    public void setVagas(Integer vagas) {
        this.vagas = vagas;
    }

    public Integer getInscritos() {
        return inscritos;
    }

    public void setInscritos(Integer inscritos) {
        this.inscritos = inscritos;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
