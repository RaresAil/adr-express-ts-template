import { Request, Response, NextFunction } from 'express';
import { Middleware } from '@adr-express-ts/core/lib/@types';
import { Inject } from '@adr-express-ts/core';

@Inject
export default class DemoMiddleware implements Middleware {
  public async middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    (req as any).myData = 'My custom request data!';
    return next();
  }
}
