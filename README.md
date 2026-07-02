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
 
## ✨ Funcionalidades
 
- Cadastro e login de usuários com autenticação JWT
- Registro de receitas e despesas com categorias personalizadas
- Edição e exclusão de registros financeiros
- Definição e acompanhamento de metas financeiras
- Sistema de gamificação com XP e níveis
- Dashboard com resumo financeiro e gráficos
- Histórico de transações por categoria
- Recuperação de senha por e-mail
---

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
│   ├── pages/       # Telas HTML
│   ├── css/         # Estilos
│   ├── js/          # Lógica de interface
│   └── images/      # Assets visuais
├── backend/
│   ├── controllers/ # Intermediação entre rotas e models
│   ├── models/      # Acesso e operações no banco de dados
│   ├── routes/      # Endpoints da API
│   ├── services/    # Regras de negócio
│   ├── middlewares/ # Autenticação e validação
│   ├── database/    # Configuração e scripts SQL
│   └── scripts/     # Scripts utilitários
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

## 🚀 Como rodar localmente
 
### Pré-requisitos
 
- Node.js instalado
- MySQL rodando localmente
### Passos
 
```bash
# 1. Clone o repositório
git clone https://github.com/FGA0138-MDS-Ajax/2026.1-T03-Brooks.git
cd 2026.1-T03-Brooks
 
# 2. Instale as dependências
cd backend
npm install
 
# 3. Configure as variáveis de ambiente
# Crie um arquivo .env na pasta backend com:
# DB_HOST=localhost
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# DB_NAME=piggyme
# JWT_SECRET=seu_secret
# EMAIL_USER=seu_email
# EMAIL_PASS=sua_senha_email
 
# 4. Execute o script SQL para criar as tabelas
# Importe o arquivo backend/database/piggyme.sql no seu MySQL
 
# 5. [Apenas uma vez] Popule as categorias padrão
node scripts/seedCategoryExistentes.js
 
# 6. Inicie o servidor
node server.js
```
 
Acesse em: [http://localhost:3000](http://localhost:3000)
 
---

## 🔀 Branches

| Branch | Descrição |
|---|---|
| `main` | Versão estável |
| `developer` | Branch principal de desenvolvimento |
| `testes` | Ambiente de testes |
| `docs` | Documentação do projeto |



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
## 📄 Licença

Projeto acadêmico — UnB/FCTE, MDS 2026.1.


