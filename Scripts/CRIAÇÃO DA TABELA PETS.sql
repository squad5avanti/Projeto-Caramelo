-- CRIAÇÃO DE TIPO PERSONALIZADO PARA CAMPO "status" NA TABELA Pets
CREATE TYPE ESTADO AS ENUM ('adotado', 'disponivel');

-- CRIAÇÃO DE TIPO PERSONALIZADO PARA CAMPO "tamanho" NA TABELA Pets
CREATE TYPE TAMANHO AS ENUM ('pequeno', 'medio', 'grande');

-- CRIAÇÃO DA TABELA Pets CONFORME REQUISITOS
CREATE TABLE Pets
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL,
    especie VARCHAR(50) NOT NULL,
    nascimento DATE NOT NULL,
    descricao VARCHAR(100),
    estado ESTADO NOT NULL,
    tamanho TAMANHO,
    personalidade VARCHAR(50),
    avatar TEXT,
    fotos TEXT
);
