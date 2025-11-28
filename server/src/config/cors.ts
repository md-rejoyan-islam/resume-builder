import { CorsOptions } from 'cors';
import secret from '../app/secret';

const whitelist: string[] = secret.clinetWhiteList;

function getMainDomain(hostname: string): string {
  const parts = hostname.split('.');
  if (parts.length <= 2) return hostname; // already main domain
  const mainDomain = parts.slice(-2).join('.');
  const url =
    secret.node_env === 'development'
      ? `http://${mainDomain}`
      : `https://${mainDomain}`;

  return url;
}

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    if (
      (origin && whitelist.includes(getMainDomain(origin || ''))) ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default corsOptions;
