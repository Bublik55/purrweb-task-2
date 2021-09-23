import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/event/entities/event.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { DisplayController } from "./display.controller";
import { DisplayService } from "./display.service";
import { Display } from "./entities/display.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event, Display, Playlist])],
  controllers: [DisplayController],
  providers: [DisplayService],
})
export class DisplayModule {}
