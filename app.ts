import { environment } from './environment/environment';

// Modules
import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import { urlencoded as bodyParserUrlencoded, json as bodyParserJson } from 'body-parser';

// Providers
import { DbProvider } from './src/providers/db.provider';

// Middlewares
import { router as userAuthMiddleware } from './src/middlewares/user-auth.middleware';
import { router as adminMiddleware } from './src/middlewares/admin.middleware';

// Routes
import { router as userRouter } from './src/router/user.router';
import { router as recipeConsumerRouter } from './src/router/recipe/consumer.router';
import { router as recipeAdminRouter } from './src/router/recipe/admin.router';

// Setup REST Server
export const app: Express = express();

app.use(cors());
app.use(compression());
app.use(bodyParserJson());
app.use(bodyParserUrlencoded({ extended: false }));

app.use('/user', userRouter);
app.use(userAuthMiddleware);
app.use('/consumer/recipe', recipeConsumerRouter);
app.use(adminMiddleware);
app.use('/admin/recipe', recipeAdminRouter);

(async (): Promise<void> => {
  if (environment.autoInstance) {
    await DbProvider.instance(environment.db);

    app.listen(environment.api.port, (): void => {
      console.info(`App listening at http://localhost:${environment.api.port}`);
    });
  }
})();
