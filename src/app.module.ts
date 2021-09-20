import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ContentModule } from "./content/content.module";
import { DataBaseModule } from "./database.providers";
import { DisplayModule } from "./display/display.module";
import { EventModule } from "./event/event.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./utils/auth/auth.module";

@Module({
  imports: [UserModule, AuthModule, DataBaseModule, EventModule, DisplayModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
