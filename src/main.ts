import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './http-error.filer';
import { NotFoundInterceptor } from './not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalInterceptors(new NotFoundInterceptor);
  app.useGlobalFilters(new ErrorFilter)
  await app.listen(3000);
}
bootstrap();
