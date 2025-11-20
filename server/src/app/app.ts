import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import fs from 'fs';
import * as yaml from 'js-yaml';
import morgan, { StreamOptions } from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import limiter from '../config/rate-limiter';
import { metricsMiddleware } from '../middlewares/matrics-middleware';
import router from '../routes';
import { logger } from '../utils/logger';
import secret from './secret';

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
// app.use(cors(corsOptions));
// for vps hosting
// app.use(cors({ origin: secret.client_url, credentials: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (secret.node_env === 'development') {
        // allow dev origins
        if (secret.client_url.includes(origin)) return callback(null, true);
      }

      // allow main domain and all subdomains
      const regex = new RegExp(
        // eslint-disable-next-line no-useless-escape
        `^https?:\/\/([a-z0-9-]+\\.)*${secret.client_url}$`,
      );
      if (regex.test(origin)) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

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
