-- Criação das tabelas para o banco de dados PostgreSQL (Neon)

CREATE TABLE IF NOT EXISTS times (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    equipe VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jogadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    numero INTEGER NOT NULL,
    posicao VARCHAR(20) NOT NULL CHECK (posicao IN ('titular', 'reserva')),
    posicao_titular INTEGER,
    time_id INTEGER REFERENCES times(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(time_id, numero)
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_times_equipe ON times(equipe);
CREATE INDEX IF NOT EXISTS idx_jogadores_time_id ON jogadores(time_id);
CREATE INDEX IF NOT EXISTS idx_jogadores_numero ON jogadores(time_id, numero);
