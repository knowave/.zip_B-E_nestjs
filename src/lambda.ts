import { NestFactory } from '@nestjs/core';
import { AppModule } from './domains/app.module';
import { NODE_ENV } from './common/env';
import { setupSwagger } from './common/config/swagger.config';
import { Handler } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

let chachedHandler: Handler;

async function bootstrap(): Promise<Handler> {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    if (NODE_ENV !== 'prod') setupSwagger(app);

    await app.init();

    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event, context, callback) => {
    if (!chachedHandler) chachedHandler = await bootstrap();

    return chachedHandler(event, context, callback);
};
