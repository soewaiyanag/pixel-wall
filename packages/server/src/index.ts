import Fastify from 'fastify';

const PORT = Number(process.env.PORT ?? 3000);

const app = Fastify();

app.get('/health', async () => {
  return { status: 'ok' };
});

app.listen({ port: PORT }, function (error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});
