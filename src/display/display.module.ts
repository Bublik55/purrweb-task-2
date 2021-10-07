import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventModule } from "src/event/event.module";
import { UserModule } from "src/user/user.module";
import { DisplayController } from "./display.controller";
import { DisplayService } from "./display.service";
import { Display } from "./entities/display.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Display]),
    UserModule,
    forwardRef(() => EventModule),
  ],
  controllers: [DisplayController],
  providers: [DisplayService],
  exports: [DisplayService],
})
export class DisplayModule {}
