# WebMatriculas - Monorepo

O **WebMatriculas** é um sistema para gestão de matrículas em instituições de ensino, composto por duas partes: um **frontend** em React e um **backend** em Spring Boot. Ambos se comunicam por meio de uma API RESTful.

## Tecnologias

- **Backend**: 
  - **Spring Boot**, **Spring Security**, **PostgreSQL**
- **Frontend**: 
  - **React**, **TypeScript**, **Bootstrap**, **Semantic UI**, **JWT**, **Axios**

## Estrutura do Projeto

Este monorepo é composto por duas partes principais:

- **[Backend](./backend/README.md)**: O backend da aplicação, responsável pela API RESTful.
- **[Frontend](./frontend/README.md)**: A interface do usuário, com funcionalidades de autenticação, gestão de matrículas e integração com o backend.

## Como Rodar o Projeto

### Backend
1. Clone o repositório do backend: `git clone https://github.com/CleristonMP/web-matriculas-api.git`
2. Navegue até a pasta `backend`: `cd backend`
3. Execute o backend com o Maven: `mvn spring-boot:run`

O backend estará disponível em `http://localhost:8080`.

### Frontend
1. Navegue até a pasta `frontend`: `cd frontend`
2. Instale as dependências: `npm install` ou `yarn`
3. Execute o frontend: `npm start`

O frontend estará disponível em `http://localhost:3000`.

## Licença

Este projeto está licenciado sob a **MIT License**. Veja o texto completo da licença [aqui](https://opensource.org/licenses/MIT).

## Contato

Para feedback, sugestões ou contribuições, entre em contato pelo e-mail: [cleriston.melo.pereira@gmail.com](mailto:cleriston.melo.pereira@gmail.com).
