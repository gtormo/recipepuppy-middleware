import environment from './environment/environment';

// Modules
import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import { urlencoded as bodyParserUrlencoded, json as bodyParserJson } from 'body-parser';

// Routes
import { router as userRouter } from './src/router/user.router';
import { router as recipeRouter } from './src/router/recipe.router';

// Setup REST Server
export const app: Express = express();

app.use(cors());
app.use(compression());
app.use(bodyParserJson());
app.use(bodyParserUrlencoded({ extended: false }));

app.use('/user', userRouter);
app.use('/recipe', recipeRouter);

if (environment.autoInstance) {
  app.listen(environment.api.port, (): void => {
    console.info(`App listening at http://localhost:${environment.api.port}`);
  });
}
