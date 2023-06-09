import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';
process.on('uncaughtException', error => {
  // console.log('uncaught Expection deceted  ..')
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is Connected successfully');
    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect Database', err);
  }

  process.on('unhandledRejection', error => {
    // console.log('unhandled Reajection is deceted, we are closing our server')
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

// console.log(x)

process.on('SIGTERM', () => {
  logger.info('SIGTERM is recived');
  if (server) {
    server.close();
  }
});
