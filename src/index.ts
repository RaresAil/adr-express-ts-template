import {
  Injector,
  Router
} from '/Users/rares/Documents/Projects/NPM Packages/adr-express-ts/lib';
import { InjectType } from '../../adr-express-ts/lib/@types';
import bodyParser from 'body-parser';
import Express from 'express';

import DemoMiddleware from './middlewares/DemoMiddleware';
import Server from './app/Server';

const expressApp = Express();

// The injections must be in the order
// Variables -> Middlwares -> Functions Results -> Functions -> Classes

Injector.setup({
  root: __dirname,
  apiPrefix: '/api',
  debug: {
    log: console.log,
    error: console.error
  },
  staticFiles: {
    path: '/',
    directory: ['public']
  },
  errorHandler: undefined /* If undefined, the default error handler will be used. */,
  notFoundHandler: undefined /* If undefined, the default not found handler will be used. */
});

// __EADIT_CLI_PLACEHOLDER_INJECT_VARS

// Inject Middlwares
Injector.inject('DemoMiddleware', DemoMiddleware, InjectType.Middleware);

// This is the only variable which must be injected after the middlewares
// Middlewares can return a promise.
Injector.inject(
  'Middlewares',
  [
    // __EADIT_CLI_PLACEHOLDER_INJECT_MIDDLEWARES

    // The function middlewares can be added normaly
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
