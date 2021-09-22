import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "./content/entities/content.entity";
import { Display } from "./display/entities/display.entity";
import { Event } from "./event/entities/event.entity";
import { ContentToPlaylist } from "./playlist/entities/content-to-playlist.entity";
import { Playlist } from "./playlist/entities/playlist.entity";
import { User } from "./user/entities/user.entity";
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [User, Playlist, Event, ContentToPlaylist, Content, Display],
      synchronize: true,
    }),
  ],
})
export class DataBaseModule {}
