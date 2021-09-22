import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ContentModule } from "./content/content.module";
import { DataBaseModule } from "./database.providers";
import { DisplayModule } from "./display/display.module";
import { EventModule } from "./event/event.module";
import { PlaylistModule } from "./playlist/playlist.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./utils/auth/auth.module";
import { JwtAuthGuard } from "./utils/auth/guards/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigService,
    AuthModule,
    DataBaseModule,
    UserModule,
    EventModule,
    DisplayModule,
    ContentModule,
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
