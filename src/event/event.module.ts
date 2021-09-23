import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Display } from "src/display/entities/display.entity";
import { User } from "src/user/entities/user.entity";
import { UserModule } from "src/user/user.module";
import { Event } from "./entities/event.entity";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Event, User, Display])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
