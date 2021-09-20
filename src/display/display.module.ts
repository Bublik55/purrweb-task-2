import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/event/entities/event.entity";
import { EventModule } from "src/event/event.module";
import { DisplayController } from "./display.controller";
import { DisplayService } from "./display.service";
import { Display } from "./entities/display.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event, Display]), EventModule],
  controllers: [DisplayController],
  providers: [DisplayService],
})
export class DisplayModule {}
