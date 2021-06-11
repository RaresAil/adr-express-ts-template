import { Configuration, Inject, Retrieve } from '@adr-express-ts/core';
import { InjectedClass } from '@adr-express-ts/core/lib/@types';
import { Application } from 'express';

// __EADIT_CLI_PLACEHOLDER_SERVER_IMPORTS

@Inject
export default class Server implements InjectedClass {
  @Retrieve('Express')
  private application?: Application;

  @Retrieve('Configuration')
  private config?: Configuration;

  // __EADIT_CLI_PLACEHOLDER_SERVER_RETRIEVE

  public async onReady(): Promise<void> {
    try {
      if (!this.application || !this.config) {
        return;
      }

      const log = this.config.debug.log ?? console.log;

      // __EADIT_CLI_PLACEHOLDER_BEFORE_SERVER_START

      const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
      this.application.listen(port, '0.0.0.0', async () => {
        this.application!.emit('ready', true); // -- For Tests
        log('Server started %o', `0.0.0.0:${port}`);
      });
    } catch (e) {
      const error = this.config?.debug.error ?? console.error;
      error(e);
    }
  }
}
