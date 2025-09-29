-- Criação do banco de dados (caso não exista)
CREATE DATABASE IF NOT EXISTS conceitos_nest;

-- Usar o banco de dados
\c conceitos_nest;

-- Criar tabela de pessoas
CREATE TABLE IF NOT EXISTS person (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de lembretes
CREATE TABLE IF NOT EXISTS reminder (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    "from" INTEGER REFERENCES person(id) ON DELETE CASCADE,
    "to" INTEGER REFERENCES person(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_person_email ON person(email);
CREATE INDEX IF NOT EXISTS idx_reminder_from ON reminder("from");
CREATE INDEX IF NOT EXISTS idx_reminder_to ON reminder("to");
CREATE INDEX IF NOT EXISTS idx_reminder_read ON reminder(read);

-- Função para atualizar o campo updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar automaticamente o campo updatedAt
CREATE TRIGGER update_person_updated_at 
    BEFORE UPDATE ON person 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminder_updated_at 
    BEFORE UPDATE ON reminder 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();