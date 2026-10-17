# pixel-wall

A shared real-time pixel canvas: one pixel every 5 seconds per person

## Tech stack

- Node.js, Yarn workspaces, TypeScript
- Server: Fastify, @fastify/websocket, zod, ioredis, Redis
- Client: Vite, Svelte 5
- Vitest, ESLint, Prettier
- Docker Compose, GitHub Actions

## Run locally

```sh
nvm use
corepack enable
cp .env.example .env
docker compose up -d
yarn install
yarn dev
```
