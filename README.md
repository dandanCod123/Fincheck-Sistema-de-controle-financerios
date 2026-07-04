# 💰 Fincheck — Sistema de Controle Financeiro

<p align="center">
  <!-- Frontend -->
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <!-- Backend -->
  <img src="https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

<p align="center">
  Aplicação fullstack para gerenciamento de finanças pessoais — controle suas receitas, despesas, contas bancárias e categorias em uma interface moderna e intuitiva.
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Stack Tecnológica](#-stack-tecnológica)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
  - [Backend (api_backend)](#-backend-api_backend)
  - [Frontend (frontend)](#-frontend-frontend)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🚀 Sobre o Projeto

O **Fincheck** é uma aplicação fullstack de controle financeiro pessoal que permite ao usuário cadastrar contas bancárias, registrar transações (receitas e despesas), categorizá-las e acompanhar sua saúde financeira de forma visual e organizada.

O projeto segue uma arquitetura **monorepo** com separação clara entre backend e frontend, utilizando **NestJS** com arquitetura modular no servidor e **React + Vite** no cliente — uma stack moderna, escalável e com tipagem forte de ponta a ponta via TypeScript.

---

## ✨ Funcionalidades

- 🏦 **Contas bancárias** — cadastre múltiplas contas (corrente, poupança, carteira, etc.)
- 💸 **Transações** — registre receitas e despesas com valor, data e categoria
- 🏷️ **Categorias** — organize suas transações por categorias customizáveis
- 📊 **Dashboard** — visão geral das finanças com resumo de saldo e movimentações
- 📅 **Filtros por data** — visualize transações por mês e ano
- 🔐 **Autenticação JWT** — login seguro com tokens de acesso
- ✅ **Validações robustas** — formulários com React Hook Form + Zod no frontend e class-validator no backend
- 📱 **Design responsivo** — interface adaptada para desktop e mobile

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│              Cliente (React)             │
│  React Query • React Hook Form • Zod    │
└────────────────────┬────────────────────┘
                     │ HTTP / REST API
┌────────────────────▼────────────────────┐
│           Servidor (NestJS)              │
│     Módulos • Guards • Pipes • DTOs     │
└────────────────────┬────────────────────┘
                     │ Prisma ORM
┌────────────────────▼────────────────────┐
│          Banco de Dados (PostgreSQL)     │
└─────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológica

### Frontend

| Tecnologia | Uso |
|---|---|
| React 18 | Biblioteca de UI |
| Vite | Bundler e dev server |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização utilitária |
| React Query (TanStack) | Cache e sincronização de dados |
| React Hook Form | Gerenciamento de formulários |
| Zod | Validação de schemas |
| React Router DOM | Roteamento client-side |
| Radix UI | Componentes acessíveis |

### Backend

| Tecnologia | Uso |
|---|---|
| NestJS | Framework Node.js modular |
| TypeScript | Tipagem estática |
| Prisma ORM | Acesso ao banco de dados |
| PostgreSQL | Banco de dados relacional |
| JWT (Passport) | Autenticação e autorização |
| class-validator | Validação de DTOs |
| bcryptjs | Hash de senhas |

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9 (ou yarn)
- [PostgreSQL](https://www.postgresql.org/) >= 14 (local ou via Docker)
- [Docker](https://www.docker.com/) *(opcional, recomendado para o banco)*

---

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/dandanCod123/Fincheck-Sistema-de-controle-financerios.git
cd Fincheck-Sistema-de-controle-financerios
```

---

### 🔧 Backend (`api_backend`)

#### 2. Acesse a pasta do backend e instale as dependências

```bash
cd api_backend
npm install
```

#### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações (veja a [seção de variáveis](#-variáveis-de-ambiente)).

#### 4. Suba o banco de dados com Docker (opcional)

```bash
docker compose up -d
```

#### 5. Execute as migrations do Prisma

```bash
npx prisma migrate dev
```

#### 6. Inicie o servidor

```bash
npm run start:dev
```

A API estará disponível em [http://localhost:3000](http://localhost:3000).

---

### 🎨 Frontend (`frontend`)

#### 7. Acesse a pasta do frontend e instale as dependências

```bash
cd ../frontend
npm install
```

#### 8. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

#### 9. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

---

## 🔐 Variáveis de Ambiente

### Backend (`api_backend/.env`)

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/fincheck"

# JWT
JWT_SECRET="sua_chave_secreta_jwt_aqui"
JWT_EXPIRES_IN="7d"

# Servidor
PORT=3000
```

### Frontend (`frontend/.env`)

```env
# URL da API
VITE_API_URL="http://localhost:3000"
```

> ⚠️ **Nunca** commite arquivos `.env` no repositório.

---

## 📜 Scripts Disponíveis

### Backend

```bash
npm run start:dev     # Inicia em modo desenvolvimento (watch)
npm run start:prod    # Inicia em modo produção
npm run build         # Gera o build de produção
npm run lint          # Executa o ESLint
npm run test          # Executa os testes unitários
npm run test:e2e      # Executa os testes end-to-end
```

### Prisma

```bash
npx prisma migrate dev    # Cria e executa uma nova migration
npx prisma migrate deploy # Aplica migrations em produção
npx prisma studio         # Abre o Prisma Studio (GUI do banco)
npx prisma generate       # Gera o Prisma Client
```

### Frontend

```bash
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera o build de produção
npm run preview   # Visualiza o build de produção localmente
npm run lint      # Executa o ESLint
```

---

## 📁 Estrutura do Projeto

```
Fincheck-Sistema-de-controle-financerios/
│
├── api_backend/                    # Backend NestJS
│   ├── prisma/
│   │   ├── schema.prisma           # Schema do banco de dados
│   │   └── migrations/             # Histórico de migrations
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/               # Autenticação JWT
│   │   │   ├── users/              # Módulo de usuários
│   │   │   ├── bank-accounts/      # Contas bancárias
│   │   │   ├── transactions/       # Transações (receitas/despesas)
│   │   │   └── categories/         # Categorias
│   │   ├── shared/                 # Pipes, Guards, decorators compartilhados
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
└── frontend/                       # Frontend React + Vite
    ├── src/
    │   ├── app/
    │   │   ├── components/         # Componentes reutilizáveis
    │   │   ├── contexts/           # Contexts do React
    │   │   ├── hooks/              # Custom hooks
    │   │   ├── pages/              # Páginas da aplicação
    │   │   ├── services/           # Chamadas à API (React Query)
    │   │   └── utils/              # Funções utilitárias
    │   ├── assets/                 # Ícones e imagens
    │   └── main.tsx
    └── package.json
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature: `git checkout -b feat/minha-feature`
3. Commit suas alterações: `git commit -m 'feat: adiciona minha feature'`
4. Push para a branch: `git push origin feat/minha-feature`
5. Abra um Pull Request

Por favor, siga o padrão de commits [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">Feito com ❤️ por <a href="https://github.com/dandanCod123">dandanCod123</a></p>
