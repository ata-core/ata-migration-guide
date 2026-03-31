// Before: Fastify with default ajv
const fastify = require("fastify")();

fastify.post(
  "/users",
  {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1 },
          email: { type: "string", format: "email" },
        },
        required: ["name", "email"],
      },
    },
  },
  async (request) => {
    return { ok: true, user: request.body };
  }
);

fastify.listen({ port: 3000 });
