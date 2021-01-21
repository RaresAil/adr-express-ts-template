import { Response } from 'express';
import { Inject, Responder } from '../../../adr-express-ts/lib';

@Inject
@Responder('Demo')
export default class DemoResponder {
  public success(res: Response, extraOutput: { [key: string]: any } = {}) {
    return res.status(200).json({
      ...extraOutput,
      success: true
    });
  }

  public demo(res: Response, status: number, output: any) {
    return res.status(status).json(output);
  }
}
