import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";
import { Content } from "./entities/content.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Content, User])],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
