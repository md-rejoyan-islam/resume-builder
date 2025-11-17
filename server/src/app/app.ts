import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import fs from 'fs';
import * as yaml from 'js-yaml';
import morgan, { StreamOptions } from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import corsOptions from '../config/cors';
import limiter from '../config/rate-limiter';
import { metricsMiddleware } from '../middlewares/matrics-middleware';
import router from '../routes';
import { logger } from '../utils/logger';

const yamltoJson = yaml.load(
  fs.readFileSync(path.join(process.cwd(), 'docs', 'openapi.yaml'), 'utf8'),
);

const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// matrics middleware
app.use(metricsMiddleware);

// serve static files
app.use('/public', express.static(path.join(process.cwd(), '/public/')));

// Serve the OpenAPI YAML as raw file and mount Swagger UI (from npm)
app.get('/docs/openapi.yaml', (_req: Request, res: Response) =>
  res.sendFile(path.join(process.cwd(), 'docs', 'openapi.yaml'), (err) => {
    if (err) {
      logger.error(`Failed to send openapi.yaml: ${err.message}`);
      res.status(500).send('Unable to load documentation');
    }
  }),
);

// Serve Swagger UI at /docs using the loaded document
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(yamltoJson as object, {
    explorer: true,
  }),
);

// CORS configuration
app.use(cors(corsOptions));
// for vps hosting
// app.use(cors({ origin: secret.client_url, credentials: true }));

const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

// morgan
if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      stream,
    }),
  );
}

// rate limiter
app.use(limiter);

// Handle favicon requests
app.get('/favicon.ico', (_req: Request, res: Response) =>
  res.status(204).end(),
);

app.use(router);

export default app;
