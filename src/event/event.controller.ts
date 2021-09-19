import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventService } from "./event.service";
@ApiTags("Events")
@Controller("users/:userId/events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(
    @Param("userId", ParseIntPipe) userid: string,
    @Body() createEventDto: CreateEventDto
  ) {
    createEventDto.user = userid;
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll(@Param("userId", ParseIntPipe) authorId: string) {
    return this.eventService.findAll(authorId);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventService.remove(+id);
  }
}
