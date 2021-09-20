import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DisplayService } from "./display.service";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";

@Controller("events/:eventid/display")
export class DisplayController {
  constructor(private readonly displayService: DisplayService) { }

  @Post()
  create(@Param("eventid") eventId: string, @Body() createDisplayDto: CreateDisplayDto) {
    createDisplayDto.event = eventId;
    return this.displayService.create(createDisplayDto);
  }

  @Get()
  findAll(@Param("eventid") eventId: string) {
    return this.displayService.findAll(eventId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.displayService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDisplayDto: UpdateDisplayDto) {
    return this.displayService.update(+id, updateDisplayDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.displayService.remove(+id);
  }
}
