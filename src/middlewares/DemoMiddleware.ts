import { Request, Response, NextFunction } from 'express';
import { Inject } from '../../../adr-express-ts/lib';
import { Middleware } from '../../../adr-express-ts/lib/@types';

@Inject
export default class AuthentificationMiddleware implements Middleware {
  public async middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    (req as any).myData = 'My custom request data!';
    return next();
  }
}
