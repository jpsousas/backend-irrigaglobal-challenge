# 🌾 Irriga Global - API de Gerenciamento de Irrigação

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue?style=for-the-badge&logo=express)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESM-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🎯 Visão Geral do Projeto

Este repositório contém a API RESTful desenvolvida para o desafio da Irriga Global. O objetivo principal é fornecer endpoints robustos e seguros para o gerenciamento de pivôs de irrigação e o registro de suas aplicações. A API é construída com **Node.js e JavaScript (ESM)**, utilizando o framework Express.js, e implementa autenticação via **JSON Web Tokens (JWT)** para proteger as rotas.

A solução prioriza a modularidade, segurança e facilidade de uso, seguindo as especificações fornecidas. A persistência dos dados é feita em memória, focando na lógica de negócio da API.

## ✨ Funcionalidades

* **Autenticação de Usuários:**
    * **Registro:** Criação de novas contas de usuário (`username`, `password`).
    * **Login:** Autenticação de usuários existentes e retorno de um JWT para acesso a rotas protegidas.
    * **Proteção de Rotas:** Todos os endpoints de gerenciamento de dados exigem um JWT válido no cabeirão `Authorization` (Bearer Token).
* **Gerenciamento de Pivôs de Irrigação:**
    * Cadastro de novos pivôs com detalhes como descrição, vazão e lâmina mínima de aplicação.
    * Listagem de todos os pivôs associados ao usuário autenticado.
    * Visualização de detalhes de um pivô específico.
    * Atualização de informações de pivôs existentes.
    * Exclusão de pivôs.
* **Gerenciamento de Registros de Irrigação:**
    * Registro de aplicações de irrigação, associadas a um pivô específico do usuário.
    * Listagem de todos os registros de irrigação para o usuário autenticado.
    * Exclusão de registros de irrigação.

## 🛠️ Tecnologias Utilizadas

* **Backend:**
    * [Node.js](https://nodejs.org/): Ambiente de execução JavaScript.
    * [Express.js](https://expressjs.com/): Framework web para Node.js (versão 5.x).
    * [JavaScript (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules): Linguagem de programação padrão.
    * [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): Para geração e validação de JWTs (versão 9.0.2).
    * [bcryptjs](https://github.com/dcodeIO/bcrypt.js/): Para hashing seguro de senhas (versão 3.0.2).
    * [uuid](https://github.com/uuidjs/uuid): Para geração de IDs únicos (versão 11.1.0).
    * [nodemon](https://nodemon.io/): Para reiniciar automaticamente o servidor durante o desenvolvimento (versão 3.1.10).
* **Persistência de Dados:**
    * Dados armazenados **em memória** (para agilidade no desenvolvimento, conforme a proposta).

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar a API em sua máquina local.

### **Pré-requisitos**

* [Node.js](https://nodejs.org/en/download/) (versão 18 ou superior recomendada)
* [npm](https://www.npmjs.com/)

### **Instalação**

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/jpsousas/backend-irrigaglobal-challenge.git

    cd seu-repositorio-backend
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Configuração das Variáveis de Ambiente:**
    * Crie um arquivo `.env` na raiz do projeto (no mesmo nível de `package.json`).
    * Adicione as seguintes variáveis de ambiente:
        ```env
        PORT=3000
        JWT_SECRET=chave JWT
        ```
        *A Substituição do campo `chave JWT` será feita automaticamente*

### **Execução**

* **Modo de Desenvolvimento (com monitoramento de arquivos):**
    ```bash
    npm run dev
    ```

A API estará rodando em `http://localhost:3000` (ou na porta que você definiu na variável `PORT`).

## 🗺️ Endpoints da API

A API expõe os seguintes endpoints. A `{{baseUrl}}` padrão é `http://localhost:3000`.

### **Autenticação**

| Método | Endpoint          | Descrição                          | Corpo da Requisição (JSON)             | Cabeçalhos Requeridos           |
| :----- | :---------------- | :--------------------------------- | :------------------------------------- | :------------------------------ |
| `POST` | `/auth/register`  | Registra um novo usuário.          | `{ "username": "string", "password": "string" }` | `Content-Type: application/json` |
| `POST` | `/auth/login`     | Autentica o usuário e retorna um JWT. | `{ "username": "string", "password": "string" }` | `Content-Type: application/json` |

### **Gerenciamento de Pivôs**

*Todos os endpoints de Pivôs requerem um `Authorization: Bearer <JWT_TOKEN>`.*

| Método | Endpoint          | Descrição                                 | Corpo da Requisição (JSON)                               |
| :----- | :---------------- | :---------------------------------------- | :------------------------------------------------------- |
| `GET`  | `/pivots`         | Lista todos os pivôs do usuário autenticado. | -                                                        |
| `GET`  | `/pivots/:id`     | Obtém detalhes de um pivô específico.     | -                                                        |
| `POST` | `/pivots`         | Cria um novo pivô.                        | `{ "description": "string", "flowRate": number, "minApplicationDepth": number }` |
| `PUT`  | `/pivots/:id`     | Atualiza um pivô existente.               | `{ "description": "string", "flowRate": number, "minApplicationDepth": number }` |
| `DELETE`| `/pivots/:id`     | Remove um pivô.                           | -                                                        |

### **Gerenciamento de Registros de Irrigação**

*Todos os endpoints de Irrigação requerem um `Authorization: Bearer <JWT_TOKEN>`.*

| Método | Endpoint          | Descrição                                       | Corpo da Requisição (JSON)                                |
| :----- | :---------------- | :---------------------------------------------- | :-------------------------------------------------------- |
| `GET`  | `/irrigations`    | Lista todos os registros de irrigação do usuário. | -                                                         |
| `GET`  | `/irrigations/:id` | Obtém detalhes de um registro específico.       | -                                                         |
| `POST` | `/irrigations`    | Cria um novo registro de irrigação.             | `{ "pivotId": "UUID_DO_PIVO", "applicationAmount": number, "irrigationDate": "ISO_DATE_STRING" }` |
| `DELETE`| `/irrigations/:id` | Remove um registro de irrigação.                | -                                                         |

## 📮 Coleção Postman

Uma coleção do Postman está disponível para facilitar o teste dos endpoints da API:

* **Arquivo:** `irriga-desafio.postman_collection.json`
* **Como importar:**
    1.  Abra o Postman.
    2.  Clique em `File > Import` (ou `Import` no canto superior esquerdo).
    3.  Selecione a opção `Upload Files` e escolha o arquivo `irriga-desafio.postman_collection.json` na raiz do seu projeto.
    4.  Certifique-se de configurar a variável de ambiente `baseUrl` no Postman para `http://localhost:3000` (ou sua URL da API).
    5.  Adicione também (sem valor inicial) essas variáveis de ambiente, elas ajudarão a testar de maneira mais prática: 
        1. jwtToken;
        2. pivotId;
        3. irrigationId;


## 🌟 Melhorias Futuras e Otimizações

* Implementar persistência de dados em um banco de dados relacional (ex: PostgreSQL com Sequelize) ou NoSQL (MongoDB).
* Adicionar validações de entrada mais robustas e tratamento de erros detalhado.
* Implementar paginação para listagens de pivôs e irrigações.
* Adicionar logging de requisições e erros.
* Melhorar a segurança (ex: Rate Limiting, CORS mais restrito, sanitização de inputs).
* Expandir funcionalidades de gerenciamento de usuário (recuperação de senha, atualização de perfil).
* Implementação de um Front-end

---
