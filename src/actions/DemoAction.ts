import {
  Action,
  Get,
  Retrieve,
  Request,
  Response,
  Post,
  Delete,
  Next,
  Params,
  Body
} from '@adr-express-ts/core';
import {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express';

import DemoResponder from '../responders/DemoResponder';
import DemoDomain from '../domain/DemoDomain';

@Action('/demo')
export default class DemoAction {
  @Retrieve('Responder.Demo')
  private responder?: DemoResponder;

  @Retrieve('Domain.Demo')
  private domain?: DemoDomain;

  @Get('/demo1')
  public findAll(
    @Request req: ExpressRequest,
    @Response res: ExpressResponse
  ): any {
    return res.send({
      success: true,
      test: (req as any).myData
    });
  }

  @Get()
  public err(@Next next: NextFunction): any {
    return next('Check next root');
  }

  @Post()
  public async saveX(
    @Response res: ExpressResponse,
    @Body body: any
  ): Promise<any> {
    const dataFromDatabase = await this.domain!.test('parameter from action');
    return this.responder!.demo(res, 201, {
      ...dataFromDatabase,
      bodyFromPost: body
    });
  }

  @Delete('/:id')
  public async deleteY(
    @Params params: { id: string },
    @Response res: ExpressResponse
  ): Promise<any> {
    return this.responder!.success(res, {
      id: params.id
    });
  }
}
