import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreatorGuards } from "src/common/guards/creator.guard";
import { DisplayExistsPipe } from "src/common/pipes/display-exists.pipe";
import { EventExistsPipe } from "src/common/pipes/event-exists.pipe";
import { GetDisplayDto } from "src/display/dto/get-display.dto";
import { EventGuard } from "src/event/guards/event.owner.guard";
import { GetUserDto } from "src/user/dto/get-user.dto";
import { CreateEventDto } from "./dto/create-event.dto";
import { GetEventDto } from "./dto/get-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventService } from "./event.service";
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

  @UseGuards(EventGuard)
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

  @UseGuards(EventGuard)
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

  @UseGuards(EventGuard)
  @ApiOperation({
    summary: "Update event",
    description: "Update event - set new title",
  })
  @ApiResponse({ status: 200 })
  @Patch(":id")
  async update(
    @Param("id", EventExistsPipe) id: string,
    @Body() updateEventDto: UpdateEventDto
  ) {
    await this.eventService.update(+id, updateEventDto);
  }

  @UseGuards(EventGuard)
  @ApiOperation({
    summary: "Delete event",
    description: "Delete event",
  })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.eventService.remove(+id);
  }

  @UseGuards(EventGuard)
  @Get("/:id/user")
  @ApiOperation({ summary: "Get User/author By event" })
  @ApiResponse({ status: 200, type: GetUserDto })
  async getUserByEvent(@Param("id", EventExistsPipe) id: string) {
    const event = await this.eventService.findOne(+id);
    const user = await event.author;
    return new GetUserDto(user);
  }

  @UseGuards(EventGuard)
  @Get("/:id/displays")
  @ApiOperation({ summary: "Get Displays by event" })
  @ApiResponse({ status: 200, type: [GetDisplayDto] })
  async getDisplaysByEvent(@Param("id", EventExistsPipe) id: string) {
    const event = await this.eventService.findOne(+id);
    const displays = await event.displays;
    return displays;
  }

  @UseGuards(EventGuard)
  @Put("/:id/displays/:displayid")
  @ApiOperation({ summary: "Attach display to event" })
  @ApiResponse({ status: 200 })
  async attachDisplaysToEvent(
    @Param("id", EventExistsPipe) id: string,
    @Param("displayid", DisplayExistsPipe) displayId: string
  ) {
    this.eventService.attachDisplayToEvent(id, displayId);
  }
}
