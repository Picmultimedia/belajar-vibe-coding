import { Elysia } from 'elysia';
import { userRoutes } from './routes/users';

const port = process.env.PORT || 3000;

const app = new Elysia()
  .get('/', () => ({ status: 'ok', message: 'Elysia is running' }))
  .use(userRoutes)
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
