import { Controller, Get } from '@nestjs/common';
import { InjectSentry, SentryService } from '@travelerdev/nestjs-sentry';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectSentry() private readonly client: SentryService,
  ) {}

  @Get()
  getHello(): string {
    const transaction = this.client.instance().startTransaction({
      op: 'test',
      name: 'My First Test Transaction',
    });

    setTimeout(() => {
      try {
        // @ts-ignore
        foo();
      } catch (e) {
        this.client.instance().captureException(e);
      } finally {
        transaction.finish();
      }
    }, 99);

    return this.appService.getHello();
  }
}
