import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentModule } from "src/content/content.module";
import { DisplayModule } from "src/display/display.module";
import { Display } from "src/display/entities/display.entity";
import { ContentToPlaylist } from "./entities/content-to-playlist.entity";
import { Playlist } from "./entities/playlist.entity";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Display, Playlist, ContentToPlaylist]),
    ContentModule,
    forwardRef(() => DisplayModule),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
