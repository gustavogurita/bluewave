package com.itb.tcc.api.bluewave.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * Tabela Inscricao do bd_bluewave.sql.
 * usuario_id é NULL quando a inscrição foi feita sem conta.
 */
@Entity
@Table(name = "Inscricao")
public class Inscricao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @ManyToOne
    @JoinColumn(name = "mutirao_id", nullable = false)
    private Mutirao mutirao;

    @Column(name = "dataInscricao", nullable = false)
    private LocalDateTime dataInscricao;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "CONFIRMADO";

    @PrePersist
    private void antesPersistir() {
        if (dataInscricao == null) {
            dataInscricao = LocalDateTime.now();
        }
        if (status == null || status.isBlank()) {
            status = "CONFIRMADO";
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public Mutirao getMutirao() {
        return mutirao;
    }

    public void setMutirao(Mutirao mutirao) {
        this.mutirao = mutirao;
    }

    public LocalDateTime getDataInscricao() {
        return dataInscricao;
    }

    public void setDataInscricao(LocalDateTime dataInscricao) {
        this.dataInscricao = dataInscricao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
