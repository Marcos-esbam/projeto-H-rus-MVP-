# Backend do App Horus

Este é o backend para o app Horus, construído com Node.js, Express, MongoDB e JWT para autenticação.

## Funcionalidades
- Cadastro e login de usuários
- Criação e listagem de postagens

## Instalação

1. Instale as dependências:
   ```
   npm install
   ```

2. Configure o MongoDB:
   - Instale o MongoDB localmente ou use MongoDB Atlas.
   - Atualize a variável `MONGO_URI` no arquivo `.env`.

3. Execute o servidor:
   ```
   npm start
   ```
   Ou para desenvolvimento:
   ```
   npm run dev
   ```

O servidor rodará na porta 5000 por padrão.

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login

### Postagens
- `GET /api/posts` - Listar todas as postagens
- `POST /api/posts` - Criar nova postagem (requer token JWT no header Authorization)

## Estrutura do Projeto
- `models/` - Modelos do MongoDB (User, Post)
- `routes/` - Rotas da API
- `server.js` - Arquivo principal do servidor