import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationPipeOptions } from './interface/validationPipeOption';
import { ValidationInterceptor } from './helpers/interceptorValidations';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationOptions: ValidationPipeOptions = {
    transform: true,
    disableErrorMessages: false,
    exceptionFactory: (errors) => {
      return {
        statusCode: 400,
        message: 'Validation failed',
        errors: errors.map((err) => ({
          field: err.property,
          constraints: err.constraints,
        })),
      };
    },
  };

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.useGlobalInterceptors(new ValidationInterceptor());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
