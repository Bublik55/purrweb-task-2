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
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DisplayOwnerGuard } from "src/auth/guards/owner.guards/display.owner.guard";
import { CreatorGuards } from "src/common/guards/creator.guard";
import { DisplayExistsPipe } from "src/common/pipes/display-exists.pipe";
import { GetEventDto } from "src/event/dto/get-event.dto";
import { GetPlaylistDto } from "src/playlist/dto/get-playlist.dto";
import { GetUserDto } from "src/user/dto/get-user.dto";
import { DisplayService } from "./display.service";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { GetDisplayDto } from "./dto/get-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";
import { CreateDisplayPipe } from "./pipes/create-display.pipe";
@ApiBearerAuth()
@ApiTags("Display")
@Controller("displays")
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @UseGuards(CreatorGuards)
  @ApiOperation({
    summary: "Create display",
    description: "Create display and attach to event",
  })
  @ApiResponse({ status: 201, type: GetDisplayDto })
  @Post()
  async create(@Body(CreateDisplayPipe) createDisplayDto: CreateDisplayDto) {
    const obj = await this.displayService.create(createDisplayDto);
    return new GetDisplayDto(obj);
  }

  @ApiOperation({
    summary: "Return all displays",
    description: "Return displays with author, event",
  })
  @ApiResponse({ status: 200, type: [GetDisplayDto] })
  @Get()
  async findAll() {
    const obj = await this.displayService.findAll();
    return obj.map((e) => new GetDisplayDto(e));
  }

  @ApiOperation({
    summary: "Return Display by ID",
    description: "Return displays",
  })
  @ApiResponse({
    status: 200,
    type: [GetDisplayDto],
  })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: string) {
    const obj = await this.displayService.findOne(+id);
    return new GetDisplayDto(obj);
  }

  @UseGuards(DisplayOwnerGuard)
  @ApiOperation({
    summary: "Update Display by ID",
    description: "Attach Display to other event",
  })
  @ApiResponse({ status: 200 })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDisplayDto: UpdateDisplayDto) {
    this.displayService.update(+id, updateDisplayDto);
  }

  @UseGuards(DisplayOwnerGuard)
  @ApiOperation({ summary: "Delete display" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.displayService.remove(+id);
  }

  @ApiOperation({ summary: "Get event by display" })
  @ApiResponse({ status: 200, type: GetEventDto })
  @Get(":id/event")
  async getEventByDisplay(@Param("id", DisplayExistsPipe) id: string) {
    const display = await this.displayService.findOne(+id);
    const event = display.event;
    return new GetEventDto(event);
  }

  @ApiOperation({ summary: "Get Author/owner of display" })
  @ApiResponse({ status: 200, type: GetUserDto })
  @Get(":id/user")
  async getUserByDisplay(@Param("id", DisplayExistsPipe) id: string) {
    const display = await this.displayService.findOne(+id);
    const user = display.author;
    return new GetUserDto(user);
  }

  @ApiOperation({ summary: "Get Playlist by Display" })
  @ApiResponse({ status: 200, type: GetPlaylistDto })
  @Get(":id/playlist")
  async getPlaylistByDisplay(@Param("id", DisplayExistsPipe) id: string) {
    const display = await this.displayService.findOne(+id);
    const playlist = display.playlist;
    return new GetPlaylistDto(playlist);
  }
}
