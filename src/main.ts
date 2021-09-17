import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT;
  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription(
      `Auth/SignUp is public route.\n
	  All requests to other routes must contain jwt token.
      \n\tUser can create column by users/{userid}/colummns route in one case:\n
      \tClient's userID == {userID}
      \tUser can update and delete sources in one case - he/she is author of source.
      \n<b>Data from DB will not serialized.</b>
	  \nAuthor of source setups in DTO manualy - anyone can setup any ID
		\n Status 500 not handled
		\n No custom exceptions
      `,
    )
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT || 4000);
}
bootstrap();
