INSERT INTO tb_usuario (nome, sobrenome, email, senha) VALUES ('Alex', 'Brown', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
INSERT INTO tb_usuario (nome, sobrenome, email, senha) VALUES ('Maria', 'Green', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_cargo (autoridade) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_cargo (autoridade) VALUES ('ROLE_ADMIN');

INSERT INTO tb_usuario_cargo (usuario_id, cargo_id) VALUES (1, 1);
INSERT INTO tb_usuario_cargo (usuario_id, cargo_id) VALUES (2, 1);
INSERT INTO tb_usuario_cargo (usuario_id, cargo_id) VALUES (2, 2);


INSERT INTO tb_municipio (nome, estado) VALUES ('São José de Ribamar', 'MA');

INSERT INTO tb_endereco (logradouro, numero, complemento, cep, bairro, municipio_id) VALUES ('Rua H', '31', 'Qda 10', '65000123', 'Novo Cohatrac', 1);

INSERT INTO tb_turma (nome, periodo) VALUES ('6A', 'Matutino');
INSERT INTO tb_turma (nome, periodo) VALUES ('7B', 'Matutino');

INSERT INTO tb_responsavel (nome, sobrenome, rg_Ou_Cpf, telefone) VALUES ('Maria', 'Ferreira', '98732145622', '98988776655');

INSERT INTO tb_aluno (nome, sobrenome, rg_Ou_Cpf, data_Nascimento, endereco_id, turma_id, responsavel_id) VALUES ('José', 'Ferreira', '15935724682', TIMESTAMP WITH TIME ZONE '2010-10-23', 1, 1, 1);
INSERT INTO tb_aluno (nome, sobrenome, rg_Ou_Cpf, data_Nascimento, endereco_id, turma_id, responsavel_id) VALUES ('Bia', 'Ferreira', '15935724682', TIMESTAMP WITH TIME ZONE '2010-08-11', 1, 2, 1);
