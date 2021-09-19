import { Module } from "@nestjs/common";
import { DisplayService } from "./display.service";
import { DisplayController } from "./display.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Event } from "src/event/entities/event.entity";
import { Display } from "./entities/display.entity";
import { EventService } from "src/event/event.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Event, Display]), EventService],
  controllers: [DisplayController],
  providers: [DisplayService],
})
export class DisplayModule {}
