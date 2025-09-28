-- CRIAÇÃO DO BANCO DE DADOS
CREATE DATABASE projeto_caramelo;

-- CRIAÇÃO DE TIPO PERSONALIZADO PARA CAMPO "status" NA TABELA "pets"
CREATE TYPE estado_adocao AS ENUM ('adotado', 'não-adotado');

CREATE TABLE pets
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    idade integer NOT NULL,
    descricao VARCHAR(100),
    status estado_adocao NOT NULL
);

CREATE TABLE adotantes
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    telefone CHAR(11) UNIQUE NOT NULL,
    endereco VARCHAR(50) NOT NULL
);

CREATE TABLE adocoes
(
    id SERIAL PRIMARY KEY,
    pets_id INT NOT NULL,
    adotantes_id INT NOT NULL,
    data_adocao date NOT NULL,
    CONSTRAINT pets_id
    FOREIGN KEY (pets_id) REFERENCES pets(id),
    CONSTRAINT adotantes_id
    FOREIGN KEY (adotantes_id) REFERENCES adotantes(id)
);
