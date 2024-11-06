## WebMatriculas Frontend

### Descrição Breve
WebMatriculas é uma aplicação web para gestão de matrículas em instituições de ensino. O frontend, desenvolvido em React, é responsável pela interface do usuário, permitindo que administradores e operadores gerenciem alunos, turmas e matrículas de forma eficiente, integrando-se a um backend via API RESTful.

### Funcionalidades
- **Autenticação e Autorização**: Acesso via JWT e OAuth.
- **Gestão de Matrículas**: Cadastrar e visualizar matrículas.
- **Impressão de Turmas**: Geração de relatórios em PDF.
- **Integração com Backend**: Comunicação via API RESTful.

### Tecnologias
- **React** (com TypeScript)
- **Bootstrap**, **Semantic UI**
- **axios**, **react-router-dom**, **jwt-decode**
- **react-hook-form**, **react-toastify**

### Rotas e Navegação
Principais rotas definidas em `AppRoutes.tsx`:
- **Públicas**: `/`, `/about`, `/auth/login`, `/auth/recover`.
- **Protegidas**: `/admin`, `/students`, `/schoolClasses`, `/users`, com controle de acesso baseado em perfis de usuário (Operador e Admin).

### Instalação
1. Clone o repositório.
2. Navegue até a pasta `frontend`.
3. Instale as dependências: `npm install` ou `yarn`.
4. Execute a aplicação: `npm start`.

### Licença
Este projeto está licenciado sob a **MIT License**. Você pode ver o texto completo da licença [aqui](https://opensource.org/licenses/MIT).

### Contato

Para feedback, propostas de trabalho ou outras questões, entre em contato pelo e-mail: [cleriston.melo.pereira@gmail.com](mailto:cleriston.melo.pereira@gmail.com).
