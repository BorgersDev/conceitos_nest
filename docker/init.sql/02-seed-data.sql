-- Inserir dados de exemplo para desenvolvimento/teste

-- Inserir pessoas de exemplo
INSERT INTO person (email, "passwordHash", name) VALUES 
    ('joao@example.com', '$2b$10$example.hash.here.for.password123', 'João Silva'),
    ('maria@example.com', '$2b$10$another.example.hash.for.senha456', 'Maria Santos'),
    ('pedro@example.com', '$2b$10$yet.another.hash.for.mypass789', 'Pedro Oliveira')
ON CONFLICT (email) DO NOTHING;

-- Inserir lembretes de exemplo
INSERT INTO reminder (text, read, "from", "to") VALUES 
    ('Lembrar de fazer a reunião às 14h', false, 1, 2),
    ('Comprar material de escritório', false, 2, 1),
    ('Revisar código do projeto', true, 1, 3),
    ('Enviar relatório mensal', false, 3, 1),
    ('Agendar consulta médica', false, 2, 3);