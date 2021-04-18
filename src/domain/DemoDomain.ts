import { Domain, Inject } from '@adr-express-ts/core';

@Inject
@Domain('Demo')
export default class DemoDomain {
  public async test(someParameter: string) {
    return {
      success: true,
      data: 'Data from database',
      someParameter
    };
  }
}
