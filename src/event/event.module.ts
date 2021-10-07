import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DisplayModule } from "src/display/display.module";
import { UserModule } from "src/user/user.module";
import { Event } from "./entities/event.entity";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Event]),
    forwardRef(() => DisplayModule),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
