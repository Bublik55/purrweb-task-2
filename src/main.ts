import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT;
  const config = new DocumentBuilder()
    .setTitle("Example")
    .setDescription(
      `Auth/SignUp is public route.
      All Other routs use JWTGuard
      All requests to other routes must contain jwt token.
    \tUser can create resource when userId in dto contain his id :\n
    \tUser can update and delete sources in one case - he/she is author of source.
	  \nAuthor of source setups in DTO - anyone can't setup any ID - otherwise Guard will rejects reqest`
    )
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(PORT || 4000);
}
bootstrap();

// REVU:
// Все что используется в нескольких модулях перенести в папку common
// Убрать декораторы class-validator'a из сущностей, добавить декораторы class-transformer где будет необходимо
