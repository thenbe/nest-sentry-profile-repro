import { Module } from '@nestjs/common';
import { SentryModule } from '@travelerdev/nestjs-sentry';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilingIntegration } from '@sentry/profiling-node';

const sentryConfig = {
  debug: true,
  dsn: 'https://430371b93eaf41928d5e0e28511759ed@o4505345839071232.ingest.sentry.io/4505345841758209',
  tracesSampleRate: 1.0,
  // @ts-ignore
  profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate
  integrations: [new ProfilingIntegration()],
};

@Module({
  imports: [
    // Profiling works
    SentryModule.forRoot(sentryConfig),

    // Profiling doesn't work
    // SentryModule.forRootAsync({ useFactory: async () => sentryConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
