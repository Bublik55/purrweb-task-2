import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { EventOwnerGuard } from "src/utils/auth/guards/owner.guards/event.owner.guard";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";
import { EventService } from "./event.service";
@ApiBearerAuth()
@ApiTags("Events")
@Controller("events")
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
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @ApiOperation({
    summary: "Return all events",
    description: "Return events with authors and displays",
  })
  @ApiResponse({
    status: 200,
    type: [Event],
  })
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiOperation({
    summary: "Get event by id",
    description:
      "Get event if event exists. Return event with author and displays",
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

  @UseGuards(EventOwnerGuard)
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

  @UseGuards(EventOwnerGuard)
  @ApiOperation({
    summary: "Delete event",
    description:
      "Delete event and return true. Return false when event dont exists",
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
