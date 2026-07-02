USE piggyme;

ALTER TABLE metas_financeiras
ADD COLUMN status ENUM('pendente','concluida')
NOT NULL DEFAULT 'pendente';

ALTER TABLE transacoes
ADD COLUMN meta_id INT NULL;

CREATE TABLE IF NOT EXISTS metas_financeiras (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  valor_alvo DECIMAL(10,2) NOT NULL,
  valor_atual DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  prazo DATE NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS xp_usuario (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL UNIQUE,
  xp_total INT NOT NULL DEFAULT 0,
  nivel INT NOT NULL DEFAULT 1,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS xp_historico (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  acao VARCHAR(50) NOT NULL,
  xp_ganho INT NOT NULL,
  descricao VARCHAR(100),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categorias (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  nome VARCHAR(50) NOT NULL,
  tipo ENUM('receita','despesa') NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  UNIQUE KEY unique_categoria_usuario(usuario_id,nome,tipo)
);

CREATE TABLE IF NOT EXISTS cursos_concluidos (
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    concluido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, curso_id),
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);