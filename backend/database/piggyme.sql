CREATE DATABASE IF NOT EXISTS piggyme
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE piggyme;

CREATE TABLE IF NOT EXISTS usuarios (
  id            INT           NOT NULL AUTO_INCREMENT,
  nome          VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  senha         VARCHAR(255)  NOT NULL,
  criado_em     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS transacoes (
  id            INT             NOT NULL AUTO_INCREMENT,
  usuario_id    INT             NOT NULL,
  valor         DECIMAL(10, 2)  NOT NULL,
  tipo          ENUM('receita', 'despesa') NOT NULL,
  descricao     VARCHAR(255),
  data          DATE            NOT NULL,
  criado_em     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS metas_financeiras (
  id            INT             NOT NULL AUTO_INCREMENT,
  usuario_id    INT             NOT NULL,
  valor_alvo    DECIMAL(10, 2)  NOT NULL,
  valor_atual   DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
  prazo         DATE            NOT NULL,
  criado_em     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS xp_usuario (
  id            INT       NOT NULL AUTO_INCREMENT,
  usuario_id    INT       NOT NULL UNIQUE,
  xp_total      INT       NOT NULL DEFAULT 0,
  nivel         INT       NOT NULL DEFAULT 1,
  criado_em     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS xp_historico (
  id            INT          NOT NULL AUTO_INCREMENT,
  usuario_id    INT          NOT NULL,
  acao          VARCHAR(50)  NOT NULL,   -- 'gasto', 'receita', 'meta_criada', etc.
  xp_ganho      INT          NOT NULL,
  descricao     VARCHAR(100),
  criado_em     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
