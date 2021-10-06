import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/event/entities/event.entity";
import { EventModule } from "src/event/event.module";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { PlaylistModule } from "src/playlist/playlist.module";
import { User } from "src/user/entities/user.entity";
import { UserModule } from "src/user/user.module";
import { DisplayController } from "./display.controller";
import { DisplayService } from "./display.service";
import { Display } from "./entities/display.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Display, Playlist, User]),
    UserModule,
    PlaylistModule,
    EventModule,
  ],
  controllers: [DisplayController],
  providers: [DisplayService],
  exports: [DisplayService],
})
export class DisplayModule {}
