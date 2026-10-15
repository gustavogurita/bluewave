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
 * Tabela Usuario do bd_bluewave.sql.
 * username = e-mail usado no login; password = hash bcrypt.
 */
@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 254)
    private String nome;

    @Column(name = "username", nullable = false, length = 255)
    private String username;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    /** ADMIN ou USER */
    @Column(name = "nivelAcesso", length = 10)
    private String nivelAcesso;

    @Column(name = "foto", columnDefinition = "varbinary(max)")
    private byte[] foto;

    @Column(name = "dataCadastro", nullable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "dataAtualizacao")
    private LocalDateTime dataAtualizacao;

    /** ATIVO / INATIVO / TROCAR_SENHA */
    @Column(name = "statusUsuario", nullable = false, length = 20)
    private String statusUsuario;

    @PrePersist
    private void antesPersistir() {
        if (dataCadastro == null) {
            dataCadastro = LocalDateTime.now();
        }
        if (statusUsuario == null || statusUsuario.isBlank()) {
            statusUsuario = "ATIVO";
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNivelAcesso() {
        return nivelAcesso;
    }

    public void setNivelAcesso(String nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }

    public byte[] getFoto() {
        return foto;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public String getStatusUsuario() {
        return statusUsuario;
    }

    public void setStatusUsuario(String statusUsuario) {
        this.statusUsuario = statusUsuario;
    }
}
