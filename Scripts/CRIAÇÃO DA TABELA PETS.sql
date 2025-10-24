-- CRIAÇÃO DE TIPO PERSONALIZADO PARA CAMPO "status" NA TABELA Pets
CREATE TYPE ESTADO AS ENUM ('reservado', 'adotado', 'disponivel');

-- CRIAÇÃO DE TIPO PERSONALIZADO PARA CAMPO "tamanho" NA TABELA Pets
CREATE TYPE TAMANHO AS ENUM ('pequeno', 'medio', 'grande');

-- CRIAÇÃO DE TIPO PERSONALIZADO PARA CAMPO "situacao" NA TABELA Pets
CREATE TYPE SITUACAO AS ENUM ('pendente', 'aceito');

-- CRIAÇÃO DE TIPO PERSONALIZADO PARA CAMPO "sexo" NA TABELA Pets
CREATE TYPE SEXO AS ENUM ('macho', 'femea', 'outro');

-- CRIAÇÃO DA TABELA Pets CONFORME REQUISITOS
CREATE TABLE Pets
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL,
    especie VARCHAR(50) NOT NULL,
    nascimento DATE NOT NULL,
    descricao VARCHAR(100),
    estado ESTADO NOT NULL,
    situacao SITUACAO NOT NULL,
    vacinado BOOLEAN NOT NULL,
    peso NUMERIC(5, 3) CHECK (peso >= 0), 
    sexo SEXO NOT NULL,
    tamanho TAMANHO NOT NULL,
    personalidade VARCHAR(50),
    avatar TEXT,
    fotos TEXT
);
