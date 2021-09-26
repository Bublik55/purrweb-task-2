import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { env } from "process";
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
      host: env.DB_HOST,
      port: +env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_BASE_NAME,
      entities: [User, Playlist, Event, ContentToPlaylist, Content, Display],
      synchronize: true,
    }),
  ],
})
export class DataBaseModule {}
