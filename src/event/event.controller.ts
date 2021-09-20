import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";
import { EventService } from "./event.service";
@ApiTags("Events")
@Controller("users/:userId/events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({
    summary: "Create event",
    description: "Create event and attach user to its. UserId in path",
  })
  @ApiProperty({
    example: Event,
  })
  @ApiResponse({
    status: 201,
    type: Event,
  })
  @Post()
  create(
    @Param("userId", ParseIntPipe) userid: string,
    @Body() createEventDto: CreateEventDto
  ) {
    createEventDto.user = userid;
    return this.eventService.create(createEventDto);
  }

  @ApiOperation({
    summary: "Return all events of user",
    description: "Return events by userId. UserId in path",
  })
  @ApiResponse({
    status: 200,
    type:  [Event]
  })
  @Get()
  findAll(@Param("userId", ParseIntPipe) authorId: string) {
    return this.eventService.findAll(authorId);
  }

  @ApiOperation({
    summary: "Getevent by id",
    description: "Get event if event exists. Return event with author and displays",
  })
  @ApiProperty({
    example: Event,
  })
  @ApiResponse({
    status: 200,
    type: Event,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.eventService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update event",
    description: "Update event - attach displays to its. Displays ids in DTO",
  })
  @ApiProperty({
    example: UpdateEventDto,
  })
  @ApiResponse({
    status: 200,
    type: Event,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @ApiOperation({
    summary: "Delete event",
    description: "Delete event and return true. Return false when event dont exists",
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventService.remove(+id);
  }
}
