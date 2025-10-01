# Projeto Caramelo - Bootcamp Avanti Desenvolvimento Full-stack 2025.3

Projeto de aplicação web full-stack de conclusão do curso, utilizando as seguintes tecnologias:

Banco de Dados: PostgreSQL

Back-end: JavaScript com Node.JS, Express e Prisma ORM 

Front-end: JavaScript com React

## OBJETIVO

Aplicação web para cadastramento e controle voltada para um abrigo de pets, de forma a agilizar e modernizar o processo.

## INSTALAÇÃO

1. Clonar o repositório;

2. Instalar as dependências:

```bash
npm install
```

3. Criar um arquivo ".env" no diretório raíz do projeto com a variável "DATABASE_URL" apontando para o banco de dados criado na sua máquina (de acordo com os scripts SQL na pasta /Scripts/) e outra variável "SECRET_JWT" com uma senha (secret) aleatória, de preferência gerada aleatoriamente por algum programa, de acordo com o exemplo:

```bash
DATABASE_URL="[string_de_conexao]" 

SECRET_JWT="[senha_gerada_aleatoriamente]"
```

4. Conectar o Prisma ORM com o banco de dados local acessível por meio do endereço em "DATABASE_URL" (4.1) OU através de migration (4.2).

4.1. Importar banco de dados PostgreSQL para o Prisma:

```bash
npx prisma db pull
```

Após, gerar o schema que ficará disponível em ./prisma/schema.prisma: 

```bash
npx prisma generate
```

4.2. ALTERNATIVAMENTE, utilizando migration:

```bash
npx prisma migrate dev
```

5. Iniciar a aplicação:

```bash
npm start
```
