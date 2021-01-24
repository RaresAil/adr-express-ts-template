import { Configuration, Inject, Retrive } from 'adr-express-ts';
import { InjectedClass } from 'adr-express-ts/lib/@types';
import { Application } from 'express';

// __EADIT_CLI_PLACEHOLDER_SERVER_IMPORTS

@Inject
export default class Server implements InjectedClass {
  @Retrive('Express')
  private application?: Application;

  @Retrive('Configuration')
  private config?: Configuration;

  // __EADIT_CLI_PLACEHOLDER_SERVER_RETRIVE

  public async onReady(): Promise<void> {
    try {
      if (!this.application || !this.config) {
        return;
      }

      const log = this.config.debug.log ?? console.log;

      // __EADIT_CLI_PLACEHOLDER_BEFORE_SERVER_START

      this.application.listen(4000, '0.0.0.0', async () => {
        this.application!.emit('ready', true); // -- For Tests
        log('Server started %o', '0.0.0.0:4000');
      });
    } catch (e) {
      const error = this.config?.debug.error ?? console.error;
      error(e);
    }
  }
}
