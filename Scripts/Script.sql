CREATE TYPE estado_adocao AS ENUM ('adotado', 'não-adotado');

-- Table: public.pets

-- DROP TABLE IF EXISTS public.pets;

CREATE TABLE IF NOT EXISTS public.pets
(
    pets_id integer NOT NULL DEFAULT nextval('pets_pets_id_seq'::regclass),
    nome character varying(50) COLLATE pg_catalog."default" NOT NULL,
    especie character varying(50) COLLATE pg_catalog."default" NOT NULL,
    idade integer NOT NULL,
    descricao character varying(100) COLLATE pg_catalog."default",
    status estado_adocao NOT NULL,
    CONSTRAINT pets_pkey PRIMARY KEY (pets_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pets
    OWNER to postgres;

-- Table: public.adotantes

-- DROP TABLE IF EXISTS public.adotantes;

CREATE TABLE IF NOT EXISTS public.adotantes
(
    adotante_id integer NOT NULL DEFAULT nextval('adotantes_adotante_id_seq'::regclass),
    nome character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    telefone character(11) COLLATE pg_catalog."default" NOT NULL,
    endereco character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT adotantes_pkey PRIMARY KEY (adotante_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.adotantes
    OWNER to postgres;

-- Table: public.adocoes

-- DROP TABLE IF EXISTS public.adocoes;

CREATE TABLE IF NOT EXISTS public.adocoes
(
    adocao_id integer NOT NULL DEFAULT nextval('adocoes_adocao_id_seq'::regclass),
    pets_id integer NOT NULL DEFAULT nextval('adocoes_pets_id_seq'::regclass),
    adotante_id integer NOT NULL DEFAULT nextval('adocoes_adotante_id_seq'::regclass),
    data_adocao date,
    CONSTRAINT adocoes_pkey PRIMARY KEY (adocao_id),
    CONSTRAINT adocoes_adotante_id_fkey FOREIGN KEY (adotante_id)
        REFERENCES public.adotantes (adotante_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT adocoes_pets_id_fkey FOREIGN KEY (pets_id)
        REFERENCES public.pets (pets_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.adocoes
    OWNER to postgres;
