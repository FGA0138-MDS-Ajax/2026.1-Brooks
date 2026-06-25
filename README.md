# 🐷 PiggyMe

> **Versão 2026.1 — Brooks**  
> Sistema gamificado de gestão financeira pessoal — simples, intuitivo e interativo.

PiggyMe ajuda usuários a assumirem o controle de suas finanças por meio de um sistema de controle de gastos, receitas e hábitos financeiros com elementos de gamificação que tornam a experiência mais engajante e motivadora.

---

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Como Rodar](#como-rodar)
- [Módulos Implementados](#módulos-implementados)
- [Regras de Negócio](#regras-de-negócio)
- [Versionamento](#versionamento)

---

## Visão Geral

PiggyMe é desenvolvido com o objetivo de democratizar o controle financeiro pessoal, oferecendo uma interface clara e uma experiência gamificada para incentivar bons hábitos com o dinheiro.

---

## Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Runtime | Node.js |
| Banco de Dados | MySQL |
| Autenticação | bcrypt + jsonwebtoken |
| E-mail | Nodemailer |
| Variáveis de Ambiente | dotenv |

### Instalação das dependências

```bash
npm install mysql2 bcrypt jsonwebtoken dotenv nodemailer
```

---

## Arquitetura

O projeto segue o padrão arquitetural **MVC (Model-View-Controller)**, com separação clara de responsabilidades entre as camadas:

```
backend/
├── controllers/       # Lógica de negócio e intermediação entre rotas e models
├── models/            # Acesso e operações no banco de dados
├── routes/            # Definição dos endpoints da API
├── database/          # Configuração e conexão com o MySQL
└── scripts/           # Scripts utilitários (ex: seeds)
```

---

## Instalação

### Pré-requisitos

- Node.js instalado
- MySQL rodando localmente
- Banco de dados criado conforme os scripts em `database/`

### Passos

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Acesse a pasta do backend
cd backend

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
# Crie um arquivo .env com base no modelo fornecido

# 5. Execute os scripts SQL para criar as tabelas
# (consulte os arquivos em database/)

# 6. [Apenas uma vez] Popule as categorias padrão para usuários existentes
node scripts/seedCategoryExistentes.js
```

---

## Como Rodar

```bash
cd backend
node server.js
```

Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

---

## Módulos Implementados

### Sprint 1 — Cadastro de Usuário

| Arquivo | Localização | Responsabilidade |
|---------|-------------|------------------|
| `userController.js` | `controllers/` | Recebe os dados do usuário, valida a senha e verifica duplicidade de e-mail |
| `User.js` | `models/` | Verifica e-mail, criptografa senha e insere o usuário no banco |
| `userRoutes.js` | `routes/` | Define o endpoint de registro (`POST /register`) |
| `server.js` | `services/` | Inicializa o servidor Node.js |
| `config.js` | `database/` | Configura e establece a conexão com o MySQL |

---

### Sprint 3 — Categorias Personalizadas

| Arquivo | Localização | Responsabilidade |
|---------|-------------|------------------|
| `categoryController.js` | `controllers/` | Gerencia criação e listagem de categorias por usuário |
| `Category.js` | `models/` | Operações de banco relacionadas às categorias |
| `categoryRoutes.js` | `routes/` | Define os endpoints de categorias |
| `seedCategoryExistentes.js` | `scripts/` | Popula categorias padrão para usuários já cadastrados |

#### Setup necessário (Sprint 3)

1. Execute o script SQL de criação da tabela `categorias` (disponível em `database/`).
2. Rode o seed **uma única vez** para usuários pré-existentes:

```bash
node backend/scripts/seedCategoryExistentes.js
```

---

## Regras de Negócio

> ⚠️ **Atenção:** Estas regras são aplicadas e validadas pelo backend.

- Toda **categoria** pertence a um usuário específico e possui um tipo: `receita` ou `despesa`.
- Ao **registrar uma transação**, a categoria informada deve existir para aquele usuário e corresponder ao tipo correto.
- Transações com categorias inválidas ou inexistentes **são recusadas pelo backend**.

---

## Versionamento

```bash
# Adicionar alterações
git add .

# Criar commit
git commit -m "mensagem descritiva"

# Enviar para o repositório remoto
git push
```

---

<div align="center">
  <sub>Desenvolvido com 🐷 pelo time PiggyMe — 2026</sub>
</div>
