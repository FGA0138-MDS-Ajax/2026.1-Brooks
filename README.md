# 🐷 PiggyMe

Repositório oficial do projeto **PiggyMe**, desenvolvido pela equipe **Brooks** para a disciplina de Métodos de Desenvolvimento de Software (MDS), ministrada pelo professor Ricardo Ajax.

O PiggyMe é uma plataforma de educação financeira que auxilia usuários no controle de gastos, definição de metas, acompanhamento de economia e desenvolvimento de hábitos financeiros saudáveis através de elementos de gamificação.

> **Versão 2026.1 — Brooks**  
> Sistema gamificado de gestão financeira pessoal — simples, intuitivo e interativo.
---

## 👥 Equipe
<h2 align="center">👥 Equipe Brooks</h2>

<table align="center">
  <!-- Primeira linha -->
  <tr>
    <td align="center">
      <a href="https://github.com/Calynne">
        <img src="https://github.com/Calynne.png" width="100px;" alt="Calyene"/><br />
        <sub><b>Calyene</b></sub><br />
        <sub>Product Owner</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/cauamc2006-sketch">
        <img src="https://github.com/cauamc2006-sketch.png" width="100px;" alt="Cauã Mendes"/><br />
        <sub><b>Cauã Mendes</b></sub><br />
        <sub>Desenvolvedor</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/GiovanaRocha16">
        <img src="https://github.com/GiovanaRocha16.png" width="100px;" alt="Giovana Rocha"/><br />
        <sub><b>Giovana Rocha</b></sub><br />
        <sub>Product Owner</sub>
      </a>
    </td>
  </tr>

  <!-- Segunda linha -->
  <tr>
    <td align="center">
      <a href="https://github.com/isaiasmoraes694">
        <img src="https://github.com/isaiasmoraes694.png" width="100px;" alt="Isaias Moraes"/><br />
        <sub><b>Isaias Moraes</b></sub><br />
        <sub>Desenvolvedor</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/luis-o-jogador">
        <img src="https://github.com/luis-o-jogador.png" width="100px;" alt="Luis Gabriel"/><br />
        <sub><b>Luis Gabriel</b></sub><br />
        <sub>Desenvolvedor</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/RafaelQueiroz7">
      <img src="https://github.com/identicons/rafael-araujo.png" width="100px;" alt="Rafael Araújo"/><br />
      <sub><b>Rafael Araújo</b></sub><br />
      <sub>Desenvolvedor</sub>
    </td>
  </tr>

  <!-- Terceira linha -->
  <tr>
    <td align="center">
      <a href="https://github.com/Leafare">
        <img src="https://github.com/Leafare.png" width="100px;" alt="Rafael Magalhães"/><br />
        <sub><b>Rafael Magalhães</b></sub><br />
        <sub>Desenvolvedor</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/RodrigoDutraF88">
        <img src="https://github.com/RodrigoDutraF88.png" width="100px;" alt="Rodrigo Dutra"/><br />
        <sub><b>Rodrigo Dutra</b></sub><br />
        <sub>Desenvolvedor</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/VitorRoss1">
        <img src="https://github.com/VitorRoss1.png" width="100px;" alt="Vitor Rossi"/><br />
        <sub><b>Vitor Rossi</b></sub><br />
        <sub>Scrum Master</sub>
      </a>
    </td>
  </tr>
</table>



---

## 🛠️ Tecnologias

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Banco de dados:** MySQL
- **Versionamento:** Git/GitHub
- **Runtime:** Node.js 
- **Autenticação:** bcrypt + jsonwebtoken 
- **E-mail:** Nodemailer
- **Variáveis de Ambiente:** dotenv 

---


## 📁 Estrutura do Projeto

```text
├── frontend/
│   ├── pages/
│   ├── css/
│   ├── js/
│   └── images/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   └── database/
└── package.json
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

### Instalação das dependências

```bash
npm install mysql2 bcrypt jsonwebtoken dotenv nodemailer
```
---

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

## 🚀 Como rodar localmente

```bash
cd backend
node server.js
```
Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)


---

## 🔀 Branches

| Branch | Descrição |
|---|---|
| `main` | Versão estável |
| `developer` | Branch principal de desenvolvimento |
| `testes` | Ambiente de testes |
| `docs` | Documentação do projeto |

---

## ✨ Funcionalidades

- Cadastro e login de usuários com autenticação JWT
- Registro de receitas e despesas
- Definição e acompanhamento de metas financeiras
- Sistema de gamificação com XP e níveis
- Dashboard com resumo financeiro e gráficos
- Histórico de transações por categoria

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
git commit -m "tipo(escopo): breve descrição"

# Enviar para o repositório remoto
git push
```

---
---
## 📄 Licença

Projeto acadêmico — UnB/FCTE, MDS 2026.1.


