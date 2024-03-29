import winston, { transports } from 'winston';
const { combine } = winston.format;

const colorizer = winston.format.colorize();

export const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf((msg) =>
      colorizer.colorize(
        msg.level,
        `${msg.timestamp} - [${msg.level}]: ${msg.message}`
      )
    )
  ),
  transports: [new transports.Console()]
});

if (process.env.NODE_ENV === 'production') {
  logger
    .add(new transports.File({ filename: 'error.log', level: 'error' }))
    .add(new transports.File({ filename: 'combined.log' }));
}

export function loggerInfo(id: string, path: string, data?: unknown): void {
  logger.info(`${getTitle(id, path)}${data ? ` ${JSON.stringify(data)}` : ''}`);
}

export function loggerDebug(id: string, path: string, data?: unknown): void {
  logger.debug(
    `${getTitle(id, path)}${data ? ` ${JSON.stringify(data)}` : ''}`
  );
}

export function loggerError(id: string, path: string, error: unknown): void {
  logger.error(
    `${getTitle(id, path)}handled error... ${JSON.stringify(error)}`
  );
}

function getTitle(id: string, path: string): string {
  return `[${path}][${id}]: `;
}

function getLogValue(
  domain: string,
  method: string,
  id?: { [key: string]: string | number },
  data?: unknown
): string {
  return `[${domain}/${method}]${getKeyValue(id)}: ${
    data ? `${JSON.stringify(data)}` : ''
  }`;
}
function getKeyValue(id?: { [key: string]: string | number }): string {
  const keyValue = id ? Object.entries(id)[0] : null;
  return keyValue ? `[${keyValue[0]}: ${keyValue[1]}]` : '';
}

export class Logger {
  static info(
    domain: string,
    method: string,
    id?: { [key: string]: string | number },
    data?: unknown
  ): void {
    logger.info(getLogValue(domain, method, id, data));
  }

  static debug(
    domain: string,
    method: string,
    id?: { [key: string]: string | number },
    data?: unknown
  ): void {
    logger.debug(getLogValue(domain, method, id, data));
  }

  static error(
    domain: string,
    method: string,
    id: { [key: string]: string | number },
    error: unknown
  ): void {
    logger.error(
      getLogValue(
        domain,
        method,
        id,
        `handled error... ${JSON.stringify(error)}`
      )
    );
  }
}

function getLogValue2(
  domain: string,
  method: string,
  id?: string | number | null,
  data?: unknown
): string {
  return `[${domain}][${method}]${id ? `[${id}]` : ''}: ${
    data ? `${JSON.stringify(data)}` : ''
  }`;
}
export class Logger2 {
  static info(
    domain: string,
    method: string,
    id?: string | number | null,
    data?: unknown
  ): void {
    logger.info(getLogValue2(domain, method, id, data));
  }

  static debug(
    domain: string,
    method: string,
    id?: string | number | null,
    data?: unknown
  ): void {
    logger.debug(getLogValue2(domain, method, id, data));
  }

  static error(
    domain: string,
    method: string,
    id: string | number | null,
    error: unknown
  ): void {
    logger.error(getLogValue2(domain, method, id, `${JSON.stringify(error)}`));
  }
}
