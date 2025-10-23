-- CRIAÇÃO DA TABELA Usuarios CONFORME REQUISITOS
CREATE TABLE Usuarios
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    usuarioAdmin BOOLEAN DEFAULT FALSE,
    pets_favoritos INT NOT NULL,
    CONSTRAINT pets_favoritos_fk
    FOREIGN KEY (pets_favoritos) REFERENCES Pets(id)
);
