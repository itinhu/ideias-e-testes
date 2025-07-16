# Backend Motax

## Tecnologias
- Node.js
- Express
- Sequelize (ORM)
- MySQL
- JWT (autenticação)
- bcryptjs (hash de senhas)

## Configuração
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` com os dados do seu MySQL:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD= # sua senha do MySQL
   DB_NAME=motax
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```
3. Crie o banco de dados `motax` no MySQL.
4. Rode as migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Rode a aplicação:
   ```bash
   node index.js
   ```

## Estrutura sugerida
- `models/` - Modelos Sequelize
- `controllers/` - Lógica das rotas
- `routes/` - Definição das rotas
- `middlewares/` - Middlewares (ex: autenticação)
- `config/` - Configurações (ex: conexão DB)

---

# Documentação da API

## Autenticação
### Registrar usuário
`POST /api/auth/register`

**Body JSON:**
```json
{
  "nome": "João",
  "email": "joao@email.com",
  "senha": "123456",
  "tipo": "motoqueiro", // ou "passageiro"
  "telefone": "11999999999"
}
```
**Resposta:**
- 201: `{ id, nome, email, tipo }`
- 400: `{ error }`

### Login
`POST /api/auth/login`

**Body JSON:**
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```
**Resposta:**
- 200: `{ token, user: { id, nome, email, tipo } }`
- 400: `{ error }`

---

## Corridas (Rides)
> **Todas as rotas abaixo exigem o header:**
> `Authorization: Bearer <token>`

### Solicitar corrida
`POST /api/rides`

**Body JSON:**
```json
{
  "origem": "Rua A, 123",
  "destino": "Rua B, 456",
  "formaPagamento": "dinheiro" // ou "pix", "cartao"
}
```
**Resposta:**
- 201: objeto da corrida criada

### Listar corridas
`GET /api/rides`

**Resposta:**
- 200: lista de corridas (com dados do passageiro e motoqueiro)

### Aceitar corrida (motoqueiro)
`POST /api/rides/:id/accept`

**Resposta:**
- 200: corrida atualizada
- 404/400: `{ error }`

### Finalizar corrida
`POST /api/rides/:id/finish`

**Resposta:**
- 200: corrida atualizada
- 404: `{ error }`

---

## Observações
- Para acessar rotas protegidas, envie o token JWT no header Authorization.
- O campo `tipo` do usuário define se é motoqueiro ou passageiro.
- O campo `status` da corrida pode ser: `solicitada`, `aceita`, `finalizada`, `cancelada`.
- O campo `formaPagamento` pode ser: `dinheiro`, `pix`, `cartao`.

---

## Exemplo de uso com curl

Registrar:
```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"nome":"João","email":"joao@email.com","senha":"123456","tipo":"motoqueiro"}'
```

Login:
```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"joao@email.com","senha":"123456"}'
```

Solicitar corrida (após login):
```bash
curl -X POST http://localhost:3000/api/rides -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"origem":"Rua A, 123","destino":"Rua B, 456","formaPagamento":"dinheiro"}'
``` 