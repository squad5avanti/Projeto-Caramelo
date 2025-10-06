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

5. Executar o script de criação do primeiro usuário padrão com permissão de Administrador "seed.js", localizado em src/database/prisma:

```bash
seed.js
```

6. Inicializar o servidor:
   
```bash
npm start
```

## INFORMAÇÕES ADICIONAIS

O tipo "DateTime" do Prisma, utilizado no campo "nascimento" da tabela Pets, funciona de acordo na formatação "YYYY-MM-DDTHH:MM:SS.mmmZ", em que "YYYY-MM-DD" (ANO-MÊS-DIA) é o formato de data registrado no banco PostgreSQL, "THH : MM : SS . mmmZ" (HORA : MINUTO : SEGUNDO . MILÉSIMO) é o formato complementar "Time" que adiciona precisão de horário do dia. A formatação "YYYY-MM-DDTHH:MM:SS.mmmZ" deve ser utilizada no JSON para interação com a tabela Pets, ex.: "2025-01-01T00:00:00.000Z" que significa o dia 01/01/2025 às 00:00 horas e 0 milésimos de segundo.


