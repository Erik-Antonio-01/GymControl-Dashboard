# GymControl

Sistema de gestão de academia desenvolvido como uma aplicação web com front-end, API REST e banco de dados MySQL.

O projeto foi estruturado para separar a interface da API, permitindo que o navegador consuma os dados por HTTP/JSON sem acesso direto ao banco de dados.

## Visão geral

```text
Navegador (GymControl)
        │
        │ HTTP / JSON
        ▼
API REST (Node.js + Express)
        │
        │ mysql2
        ▼
MySQL / MariaDB
```

O sistema possui autenticação por JWT e controle de acesso por cargo, com três tipos de usuário:

- **Administrador**
- **Professor**
- **Aluno**

## Principais funcionalidades

### Dashboard

- Resumo das informações do sistema
- Estatísticas e indicadores
- Visualização de informações recentes

### Usuários

Administradores podem gerenciar usuários e cadastrar alunos e professores.

### Alunos

- Cadastro
- Consulta
- Edição
- Exclusão
- Visualização das informações disponíveis pela API

### Máquinas

- Cadastro de máquinas
- Consulta
- Edição
- Exclusão
- Organização por agrupamento muscular

### Treinos

- Criação de treinos
- Edição e exclusão
- Associação de treinos a usuários
- Inclusão de exercícios
- Definição de séries, repetições e carga

### Meus Treinos

Usuários com cargo de **aluno** conseguem consultar apenas os próprios treinos.

### Configurações

Inclui configurações locais do front-end e teste de conexão com a API.

## Controle de acesso

| Recurso | Administrador | Professor | Aluno |
|---|:---:|:---:|:---:|
| Dashboard | ✅ | ✅ | — |
| Usuários | ✅ | 👁️ | 👤 próprio |
| Alunos | ✅ | 👁️ | — |
| Máquinas | ✅ | 👁️ | 👁️ |
| Treinos | ✅ | ✅ | próprios |
| Configurações | ✅ | — | — |

O front-end esconde recursos que o usuário não pode utilizar, mas a validação de permissão também é realizada no back-end.

## Tecnologias

### Front-end

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Fetch API
- LocalStorage

### Back-end

- Node.js
- Express 5
- JavaScript (ES Modules)
- MySQL2
- JWT (`jsonwebtoken`)
- Bcrypt (`bcryptjs`)
- CORS
- Nodemon

### Banco de dados

- MySQL / MariaDB
- SQL

## Estrutura do projeto

```text
gymcontrol/
├── backend/
│   ├── database/
│   │   ├── schema.sql
│   │   └── atualizacao_usuarios.sql
│   ├── src/
│   │   ├── application/
│   │   ├── controllers/
│   │   ├── dao/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── docs/
│   └── GYMCONTROL.md
│
└── public/
    └── gym/
        ├── index.html
        ├── login.html
        ├── css/
        └── js/
            ├── api/
            └── pages/
```

## Como executar

### 1. Pré-requisitos

Instale:

- Node.js
- npm
- MySQL ou MariaDB

### 2. Criar o banco de dados

Na raiz do projeto, execute o script:

```bash
mysql -u root -p < backend/database/schema.sql
```

Isso cria o banco `academia` e as tabelas necessárias.

### 3. Configurar o back-end

Entre na pasta do backend:

```bash
cd backend
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

No Windows, também é possível simplesmente copiar `.env.example`, renomeá-lo para `.env` e editar os valores.

Configure as variáveis:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=academia
JWT_SECRET=uma_chave_segura
```

### 4. Instalar dependências

Dentro de `backend/`:

```bash
npm install
```

### 5. Iniciar a API

Modo normal:

```bash
npm start
```

Modo desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

### 6. Criar o primeiro administrador

Quando o banco estiver vazio, o primeiro `POST /usuarios` é liberado para criar o administrador inicial.

Exemplo:

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Admin","email":"admin@academia.com","senha":"troque-esta-senha"}'
```

Depois disso, os novos cadastros passam a exigir autenticação e as permissões são aplicadas de acordo com o cargo.

### 7. Abrir o front-end

O front-end está em:

```text
public/gym/
```

Abra a tela de login em:

```text
/gym/login.html
```

A URL padrão da API é `http://localhost:3000` e pode ser alterada em **Configurações → Conexão com o servidor**.

## Autenticação

O login é realizado por:

```text
POST /usuarios/login
```

A API retorna um token JWT e os dados do usuário. O token é armazenado no navegador para autorizar chamadas posteriores.

Características principais:

- JWT com validade de 8 horas
- Senhas protegidas com bcrypt
- Senha nunca é retornada pela API
- Revalidação da sessão por `GET /usuarios/me`
- Redirecionamento para login quando o token expira

## Principais endpoints

### Usuários

```text
POST   /usuarios/login
GET    /usuarios/me
GET    /usuarios
GET    /usuarios/:id
POST   /usuarios
PUT    /usuarios/:id
DELETE /usuarios/:id
```

### Máquinas

```text
GET    /maquinas
GET    /maquinas/:id
POST   /maquinas
PUT    /maquinas/:id
DELETE /maquinas/:id
```

### Treinos

```text
GET    /treinos
GET    /treinos/:id
GET    /treinos/usuario/:usuarioId
POST   /treinos
PUT    /treinos/:id
DELETE /treinos/:id
```

### Exercícios

```text
GET    /exercicios
GET    /exercicios/:id
GET    /exercicios/treino/:treinoId
POST   /exercicios
PUT    /exercicios/:id
DELETE /exercicios/:id
```

A documentação detalhada de autenticação, cargos, serviços do front-end, endpoints, códigos HTTP e limitações está em [`docs/GYMCONTROL.md`](docs/GYMCONTROL.md).

## Modo demonstração

O front-end possui um modo de demonstração ativado manualmente em **Configurações**.

Nesse modo, os dados são mantidos em memória no navegador e não são enviados ao servidor ou gravados no banco de dados.

As credenciais de demonstração aparecem na própria tela de login quando o modo demo está ativo.

## Limitações atuais

O projeto possui algumas limitações relacionadas ao que a API atualmente oferece:

- não existe endpoint para cadastro persistente da academia;
- as informações da academia nas configurações são locais ao navegador;
- busca de usuários e máquinas é feita no front-end após o carregamento da lista;
- a API não possui status/plano de aluno;
- não existe recuperação de senha por e-mail;
- não existe logout no servidor, pois o JWT é stateless;
- não existe endpoint único para salvar um treino completo: o front-end salva o treino e depois seus exercícios individualmente.

Esses pontos estão documentados em detalhes em [`docs/GYMCONTROL.md`](docs/GYMCONTROL.md).

## Organização da comunicação com a API

O front-end centraliza as requisições em `public/gym/js/api/apiClient.js`.

Os demais serviços utilizam essa camada para acessar a API, incluindo:

- `authService`
- `userService`
- `studentService`
- `teacherService`
- `machineService`
- `workoutService`
- `gymService`

Essa organização facilita futuras alterações na API e evita chamadas `fetch()` espalhadas pelas páginas.

## Segurança

O projeto utiliza algumas práticas básicas de segurança:

- senhas com bcrypt;
- JWT para autenticação;
- credenciais do banco somente no `.env`;
- validação de cargo no back-end;
- bloqueio de autoexclusão;
- escape de conteúdo dinâmico antes de inseri-lo no DOM.

Para uso em produção, ainda seria necessário revisar e reforçar a configuração de segurança, infraestrutura e gerenciamento de segredos.

## Status

Projeto funcional de gestão de academia com front-end, API REST, autenticação, controle de acesso e integração com MySQL.

## Documentação

Para detalhes técnicos e especificações completas:

- [`docs/GYMCONTROL.md`](docs/GYMCONTROL.md)
- [`backend/database/schema.sql`](backend/database/schema.sql)
- [`backend/database/atualizacao_usuarios.sql`](backend/database/atualizacao_usuarios.sql)
