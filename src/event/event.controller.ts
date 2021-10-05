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
import { CreatorGuards } from "src/common/guards/creator.guard";
import { EventOwnerGuard } from "src/auth/guards/owner.guards/event.owner.guard";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventService } from "./event.service";
import { GetEventDto } from "./dto/get-event.dto";
import { GetUserDto } from "src/user/dto/get-user.dto";
import { GetDisplayDto } from "src/display/dto/get-display.dto";
@ApiBearerAuth()
@ApiTags("Events")
@Controller("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(CreatorGuards)
  @ApiOperation({
    summary: "Create event",
    description: "Create event and attach user to its.",
  })
  @ApiResponse({
    status: 201,
    type: GetEventDto,
  })
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const event = await this.eventService.create(createEventDto);
    return new GetEventDto(event);
  }

  @ApiOperation({
    summary: "Return all events",
    description: "Return events without authors and displays",
  })
  @ApiResponse({
    status: 200,
    type: [GetEventDto],
  })
  @Get()
  async findAll() {
    const events = await this.eventService.findAll();
    return events.map((event) => new GetEventDto(event));
  }

  @ApiOperation({
    summary: "Get event by id",
    description: "Get event",
  })
  @ApiResponse({
    status: 200,
    type: [GetEventDto],
  })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: string) {
    const event = await this.eventService.findOne(+id);
    return new GetEventDto(event);
  }

  @UseGuards(EventOwnerGuard)
  @ApiOperation({
    summary: "Update event",
    description: "Update event - attach displays to its. Displays ids in DTO",
  })
  @ApiResponse({ status: 200 })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateEventDto: UpdateEventDto
  ) {
    await this.eventService.update(+id, updateEventDto);
  }

  @UseGuards(EventOwnerGuard)
  @ApiOperation({
    summary: "Delete event",
    description: "Delete event",
  })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.eventService.remove(+id);
  }

  @Get("/:id/user")
  async getUserByEvent(@Param("id") id: string) {
    const event = await this.eventService.findOne(+id);
    const user = await event.author;
    return new GetUserDto(user);
  }

  @Get("/:id/displays")
  async getDisplaysByEvent(@Param("id") id: string) {
    const event = await this.eventService.findOne(+id);
    const displays = await event.displays;
    return displays.map((display) => new GetDisplayDto(display));
  }
}
