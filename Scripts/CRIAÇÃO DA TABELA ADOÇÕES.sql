-- CRIAÇÃO DA TABELA Adocoes CONFORME REQUISITOS
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