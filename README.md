# 💜 Gerenciador de Tarefas

Uma aplicação web para gerenciamento de tarefas, desenvolvida com **Next.js 15, TypeScript e tRPC**, permitindo criar, visualizar, editar e concluir (excluir) tarefas.

O projeto foi desenvolvido como parte de um desafio técnico, com foco na construção de uma aplicação Full Stack, integração entre frontend e backend, validação de dados e renderização no servidor (SSR).

---

## ✨ Funcionalidades

- **Criar tarefas:** cadastro com título obrigatório e descrição opcional.
- **Listar tarefas:** visualização das tarefas cadastradas.
- **Editar tarefas:** atualização das informações de uma tarefa existente.
- **Concluir tarefas:** remoção de tarefas diretamente pela listagem.
- **Validação de dados:** validação dos campos no frontend e backend.
- **Tratamento de erros:** mensagens para situações como tarefas inexistentes ou dados inválidos.
- **SSR (Server-Side Rendering):** pré-carregamento da lista de tarefas no servidor.
- **Interface responsiva:** layout adaptável a diferentes tamanhos de tela.
- **Estados de interação:** feedback de carregamento, sucesso e erro nas operações.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| Next.js 15 | Framework React e estrutura da aplicação |
| React | Construção da interface |
| TypeScript | Tipagem estática |
| tRPC | Comunicação entre frontend e backend |
| TanStack Query | Gerenciamento de requisições e cache |
| Zod | Validação de dados |
| Tailwind CSS | Estilização da interface |
| Node.js | Ambiente de execução |

---

## 📁 Estrutura do projeto

```text
src/
├── app/
│   ├── api/
│   │   └── trpc-backend/
│   │       └── [trpc]/
│   │           └── route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   ├── task-list.tsx
│   └── task-form.tsx
│
├── server/
│   ├── routers/
│   │   ├── _app.ts
│   │   └── task.ts
│   ├── trpc.ts
│   └── task-store.ts
│
├── trpc/
│   ├── client.ts
│   ├── provider.tsx
│   ├── query-client.ts
│   └── server.ts
│
└── types/
    └── css.d.ts
```

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/heypamela/to-do-list-trpc
```

### 3. Acesse a pasta do projeto

```bash
cd to-do-list-trpc
```

### 4. Instale as dependências

```bash
npm install
```

### 5. Execute a aplicação

```bash
npm run dev
```

### 6. Acesse no navegador

```text
http://localhost:3000
```
---

## 🔌 API e comunicação

A comunicação entre frontend e backend é realizada utilizando tRPC.
As operações disponíveis são:

| Operação | Procedimento | Descrição |
|---|---|---|
| Listar | `tarefas.listar` | Retorna todas as tarefas |
| Criar | `tarefas.criar` | Cadastra uma nova tarefa |
| Atualizar | `tarefas.atualizar` | Atualiza uma tarefa existente |
| Excluir | `tarefas.excluir` | Remove uma tarefa |

**Endpoint tRPC:**

```text
/api/trpc-backend
```

---

## 💾 Armazenamento dos dados

Os dados são armazenados em memória, sem utilização de banco de dados, conforme solicitado no desafio técnico.

Cada tarefa possui os seguintes atributos:

- `id`: identificador único gerado automaticamente.
- `titulo`: título obrigatório da tarefa.
- `descricao`: descrição (opcional).
- `dataCriacao`: data e horário de criação.

---

## 🧪 Verificação do código

Para verificar possíveis problemas de padronização e qualidade do código, execute:

```bash
npm run lint
```

Para verificar erros de tipagem TypeScript:

```bash
npx tsc --noEmit
```
---

**Desenvolvido por Pamela**