# Backend Service

Express.js API written in TypeScript with a modular architecture optimised for future growth.

## Scripts

- `npm run dev` - start the server with hot-reload for local development.
- `npm run build` - compile TypeScript sources into `dist`.
- `npm start` - run the compiled JavaScript from the `dist` folder.

## Project Structure

```
src/
|-- config/         # Environment configuration
|-- controllers/    # Route handlers
|-- interfaces/     # Shared interfaces and types
|-- middleware/     # Express middleware
|-- models/         # Data access layer or ORM models
|-- routes/         # Route definitions
|-- services/       # Business logic
|-- utils/          # Helper utilities
|-- validators/     # Validation helpers
|-- index.ts        # Express application bootstrap
`-- server.ts       # HTTP server entry point
```

Tests live under `tests/unit` and `tests/integration`.

## Environment

The `.env` file supports:

- `PORT` - HTTP port for the server (default `3000`)
- `NODE_ENV` - runtime environment label
- `LOG_LEVEL` - Winston logging level (default `info`)
- `LOG_FILE` - Path to the Winston log file (default `logs/app.log`)

## API Documentation

The OpenAPI specification lives at `backend/openapi.yaml`. Run `npm run dev` and visit `/docs` to view the Swagger UI powered by that spec.
