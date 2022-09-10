INSERT INTO tb_user (name, last_Name, email, password) VALUES ('Alex', 'Brown', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
INSERT INTO tb_user (name, last_Name, email, password) VALUES ('Maria', 'Green', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_county (name, state) VALUES ('São José de Ribamar', 'MA');

INSERT INTO tb_address (public_Place, number, complement, zip_Code, district, county_id) VALUES ('Rua H', '31', 'Qda 10', '65000123', 'Novo Cohatrac', 1);

INSERT INTO tb_school_class (name, period) VALUES ('6A', 'Matutino');
INSERT INTO tb_school_class (name, period) VALUES ('7B', 'Matutino');

INSERT INTO tb_parent (name, last_Name, cpf, phone) VALUES ('Maria', 'Ferreira', '98732145622', '98988776655');

INSERT INTO tb_student (name, last_Name, cpf, birth_Date, address_id, school_Class_id, parent_id) VALUES ('José', 'Ferreira', '15935724682', TIMESTAMP WITH TIME ZONE '2010-10-23', 1, 1, 1);
INSERT INTO tb_student (name, last_Name, cpf, birth_Date, address_id, school_Class_id, parent_id) VALUES ('Bia', 'Ferreira', '15935724682', TIMESTAMP WITH TIME ZONE '2010-08-11', 1, 2, 1);
