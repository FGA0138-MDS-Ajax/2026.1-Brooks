# PiggyMe - 2026.1-Brooks
Sistema gamificado de gestão financeira desenvolvido para auxiliar os usuários no controle de gastos,receitas e hábitos finacieros de forma simples, intuitiva e interativa.

Requires: MySql, bcrypt, jsonwebtoken, npm install

npm install mysql2
npm install bcrypt
npm install jsonwebtoken
npm install dotenv


A gente abre pelo localhost:3000/
no terminal vc entra na pasta backend com cd backend
e depois node server.js

rapaziada vamos seguir assim
git fetch
git status
git pull

git add .
git commit -m "mensagem"
git push


Para desenvolver o nosso sistema optamos pelo modelo arquitetural Model View Controller e dividimos portanto as pastas nos diretórios de acordo com o nosso documento de arquitetura.

Com objetivo de realizar o cadastro de usuário proposto na Sprint 1 foram criados os seguintes arquivos:

      userController.js em controller: importa o User.js do models recebe dados do usuário, valiada senha e verifica se e-mail já existe.

      User.js em models: gerencia operações no banco de dados, verifica se o e-mail já está cadastrado, criptografa a senha e insere o usuário no banco de dados.

      userRoutes.js em Routes: define o URL que o front-end e API devem chamar para registrar um usuário.

      server.js em services: inicia o servidor.

      config.js em database: conecta o Node.js e o MYSQL.

