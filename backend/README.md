# WebMatriculas - Backend

O WebMatriculas é um projeto desenvolvido utilizando Spring e React, que tem como objetivo gerenciar o processo de matrículas em uma instituição de ensino. Esta parte do documento aborda os detalhes do backend da aplicação.

## Sobre o Projeto

O backend do WebMatriculas é responsável por fornecer a API RESTful que será consumida pelo frontend. Algumas das principais funcionalidades implementadas no backend incluem:

- Autenticação e autorização de usuários
- Gerenciamento de alunos, cursos e matrículas
- Geração de relatórios e estatísticas

## Tecnologias Utilizadas

O backend do projeto WebMatriculas foi construído utilizando as seguintes tecnologias:

- **Spring Boot 2.4.4**: Framework Java para desenvolvimento de aplicações web
- **Spring Data JPA**: Módulo do Spring para acesso a bancos de dados relacionais
- **Spring Security**: Módulo do Spring para autenticação e autorização
- **Spring Security OAuth2**: Módulo do Spring para implementação de OAuth2
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados do sistema

## Versões e Requisitos

O backend do WebMatriculas foi desenvolvido utilizando:

- **Java 11**: Linguagem de programação utilizada
- **Maven 3.x**: Gerenciador de dependências e build do projeto
- **Spring Boot 2.4.4**: Versão do framework Spring Boot utilizada

## Estrutura de Pacotes e Classes

O backend do WebMatriculas está organizado da seguinte forma:

- `com.example.webmatriculas`
  - `config`: Classes de configuração da aplicação
  - `controller`: Classes que implementam os endpoints da API REST
  - `dto`: Classes de transferência de dados (Data Transfer Objects)
  - `entity`: Entidades do modelo de domínio
  - `repository`: Interfaces que definem os métodos de acesso ao banco de dados
  - `service`: Classes que implementam a lógica de negócio da aplicação

## Endpoints da API

As principais rotas da API REST do backend são:

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/auth/login` | Realiza autenticação de usuário |
| `GET` | `/students` | Retorna a lista de alunos matriculados |
| `POST` | `/students` | Cadastra um novo aluno |
| `GET` | `/courses` | Retorna a lista de cursos oferecidos |
| `POST` | `/courses` | Cadastra um novo curso |
| `GET` | `/enrollments` | Retorna a lista de matrículas realizadas |
| `POST` | `/enrollments` | Realiza uma nova matrícula |

Essa tabela reflete as rotas definidas nos seguintes controladores:

- `AuthResource`: Responsável pela autenticação de usuários
- `StudentResource`: Responsável pelo gerenciamento de alunos
- `CourseResource`: Responsável pelo gerenciamento de cursos
- `EnrollmentResource`: Responsável pelo gerenciamento de matrículas

## Segurança

O backend do WebMatriculas implementa mecanismos de segurança, incluindo:

- **Autenticação**: Usando Spring Security, o sistema possui suporte a autenticação de usuários via token JWT.
- **Autorização**: O acesso aos endpoints da API é controlado com base nas permissões dos usuários.

## Configuração do Banco de Dados

O projeto está configurado para utilizar o banco de dados PostgreSQL. As informações de acesso ao banco de dados estão definidas no arquivo `application.properties`.

## Configuração e Execução

Para executar o backend localmente, siga estas etapas:

1. Certifique-se de ter o Java 11 e o Maven instalados em sua máquina.
2. Clone o repositório do projeto: `git clone https://github.com/CleristonMP/web-matriculas-api.git`
3. Navegue até o diretório do projeto: `cd web-matriculas-api`
4. Execute o comando `mvn spring-boot:run` para iniciar a aplicação.

O backend estará disponível em `http://localhost:8080`.

## Contribuição

Contribuições são bem-vindas! Caso encontre algum problema ou tenha sugestões de melhoria, sinta-se à vontade para abrir uma issue ou enviar um pull request.
