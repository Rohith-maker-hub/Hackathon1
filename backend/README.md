# FlowMind AI Backend

The backend for FlowMind AI - an autonomous AI Workflow Automation Platform.
This backend allows multiple AI agents to collaborate, reason, plan, execute workflows, and communicate with each other.

## Features
- **Express + TypeScript**: Scalable layered architecture.
- **Supabase**: PostgreSQL database, real-time subscriptions, Row Level Security.
- **Auth**: Custom JWT-based authentication with Supabase users mapping.
- **AI Integration**: OpenAI & LangGraph powering autonomous agents (Planner, Research, Decision, Execution, Summary).
- **Validation**: Zod schema validations for robust API requests.
- **Security**: Helmet, Rate Limiter, CORS enabled.

## Architecture

The project follows a layered architecture:
`Routes` -> `Controllers` -> `Services` -> `Repositories` -> `Supabase`

- **Controllers**: Handle HTTP requests and responses.
- **Services**: Contain business logic (e.g., auth, external APIs).
- **Repositories**: Handle direct interactions with Supabase (CRUD operations).
- **Agents/Workflows**: Contain logic for the autonomous AI engine.

## Environment Variables

Copy the `.env.example` to `.env` and configure:

```
PORT=3001
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
GEMINI_API_KEY=...
OPENAI_API_KEY=...
JWT_SECRET=...
```

## API Documentation

- **Auth**: `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/refresh`
- **Agents**: `/api/agents` (GET, POST, PUT, DELETE)
- **Workflows**: `/api/workflows` (GET, POST, PUT, DELETE), `/api/workflows/:id/run`
- **Tasks**: `/api/tasks` (GET, POST, PUT, DELETE)
- **Chat**: `/api/chat`, `/api/chat/stream`
- **Dashboard**: `/api/dashboard`
- **Analytics**: `/api/analytics`

## Setup & Running Locally

1. `npm install`
2. Run database migrations: apply the SQL file in `supabase/migrations/01_initial_schema.sql` to your Supabase project.
3. `npm run dev` to start in development mode.
4. `npm run build` & `npm start` for production.

## Deployment

Configuration files are included for:
- Docker (`Dockerfile`)
- Railway (`railway.toml`)
- Render (`render.yaml`)
