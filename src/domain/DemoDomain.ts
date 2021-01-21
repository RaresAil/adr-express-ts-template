import { Domain, Inject } from '../../../adr-express-ts/lib';

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
