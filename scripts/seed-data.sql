-- Dados iniciais para o banco de dados

INSERT INTO times (nome, equipe) VALUES 
('Time A', 'Equipe A'),
('Time B', 'Equipe B'),
('Time C', 'Equipe C'),
('Time D', 'Equipe D'),
('Time E', 'Equipe E'),
('Time F', 'Equipe F'),
('Time G', 'Equipe G'),
('Time H', 'Equipe H'),
('Time I', 'Equipe I'),
('Time J', 'Equipe J'),
('Time K', 'Equipe K'),
('Time L', 'Equipe L')
ON CONFLICT (equipe) DO NOTHING;
