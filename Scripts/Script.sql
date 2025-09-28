-- CRIAÇÃO DO BANCO DE DADOS
CREATE DATABASE Projeto_Caramelo;

-- CRIAÇÃO DE TIPO PERSONALIZADO PARA CAMPO "status" NA TABELA "pets"
CREATE TYPE ESTADO AS ENUM ('adotado', 'disponível');

CREATE TABLE Pets
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL,
    especie VARCHAR(50) NOT NULL,
    nascimento DATE NOT NULL,
    descricao VARCHAR(100),
    status ESTADO NOT NULL
);

CREATE TABLE Adotantes
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    endereco VARCHAR(50) NOT NULL
);

CREATE TABLE Adocoes
(
    id SERIAL PRIMARY KEY,
    pets_id INT NOT NULL,
    adotantes_id INT NOT NULL,
    data_adocao DATE NOT NULL,
    CONSTRAINT pets_id_fk
    FOREIGN KEY (pets_id) REFERENCES Pets(id),
    CONSTRAINT adotantes_id_fk
    FOREIGN KEY (adotantes_id) REFERENCES Adotantes(id)
);

CREATE TABLE Usuarios
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    usuarioAdmin BOOLEAN DEFAULT FALSE
);

-- Criação de um usuário inicial com permissão de Admin para cadastrar outro usuário com senha hasheada
INSERT INTO Usuarios
(nome, telefone, email, senha, usuarioAdmin)
VALUES
('Usuario', '0', 'email', 'admin123', TRUE)


