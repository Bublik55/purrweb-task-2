import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { User } from "src/user/entities/user.entity";
import { Display } from "src/display/entities/display.entity";
@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Event, User, Display])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
