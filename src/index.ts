import { InjectType } from '@adr-express-ts/core/lib/@types';
import { Injector, Router } from '@adr-express-ts/core';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import Express from 'express';

// __EADIT_CLI_PLACEHOLDER_IMPORTS

import DemoMiddleware from './middlewares/DemoMiddleware';
import Server from './app/Server';

const expressApp = Express();

// The injections must be in the order
// Variables -> Middlewares -> Functions Results -> Functions -> Classes

Injector.setup({
  rootFile: __filename,
  apiPrefix: '/api',
  debug: {
    log: console.log,
    error: console.error
  },
  staticFiles: {
    path: '/',
    directory: ['public'],
    middlewares: [
      rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 100,
        message: {
          message: 'Too many requests, please try again later.',
          success: false,
          status: 429
        }
      })
    ]
  },
  errorHandler: undefined /* If undefined, the default error handler will be used. */,
  notFoundHandler: undefined /* If undefined, the default not found handler will be used. */
});

// __EADIT_CLI_PLACEHOLDER_INJECT_VARS

// Inject Middlewares
Injector.inject('DemoMiddleware', DemoMiddleware, InjectType.Middleware);

// This is the only variable which must be injected after the middlewares
// Middlewares can return a promise.
Injector.inject(
  'Middlewares',
  [
    // __EADIT_CLI_PLACEHOLDER_INJECT_MIDDLEWARES

    // The function middlewares can be added normally
    // in this case, body parser will be loaded like : app.use(bodyParser.json())
    bodyParser.json(),

    // The injected middlewares (class middlewares) must be added as strings
    'DemoMiddleware'
  ],
  InjectType.Variable
);

// The core.
Injector.inject('Express', expressApp, InjectType.Variable);

// Inject Classes
Injector.inject('Server', Server);
Injector.inject('Router', Router);

// Trigger the ready event.
Injector.ready();

export default expressApp;
