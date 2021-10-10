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
import { CreatorGuard } from "src/common/guards/creator.guard";
import { DisplayExistsPipe } from "src/common/pipes/display-exists.pipe";
import { PlaylistExistsPipe } from "src/common/pipes/playlist-exists.pipe";
import { DisplayGuard } from "src/display/guards/display.guard";
import { GetEventDto } from "src/event/dto/get-event.dto";
import { GetPlaylistDto } from "src/playlist/dto/get-playlist.dto";
import { GetUserDto } from "src/user/dto/get-user.dto";
import { DisplayService } from "./display.service";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { GetDisplayDto } from "./dto/get-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";
import { CreateDisplayPipe } from "./pipes/create-display.pipe";
import { UpdateDisplayPipe } from "./pipes/update-display.pipe";
@ApiBearerAuth()
@ApiTags("Display")
@Controller("displays")
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @UseGuards(CreatorGuard)
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
    description: "Return displays with author",
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

  @UseGuards(DisplayGuard)
  @ApiOperation({
    summary: "Update Display by ID",
    description: "Attach Display to other event",
  })
  @ApiResponse({ status: 200 })
  @Patch(":id")
  update(
    @Param("id", DisplayExistsPipe) id: string,
    @Body(UpdateDisplayPipe) updateDisplayDto: UpdateDisplayDto
  ) {
    this.displayService.update(+id, updateDisplayDto);
  }

  @UseGuards(DisplayGuard)
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
    const event = await display.event;
    return new GetEventDto(event);
  }

  @UseGuards(DisplayGuard)
  @ApiOperation({ summary: "Get Author/owner of display" })
  @ApiResponse({ status: 200, type: GetUserDto })
  @Get(":id/user")
  async getUserByDisplay(@Param("id", DisplayExistsPipe) id: string) {
    const display = await this.displayService.findOne(+id);
    const user = display.author;
    return new GetUserDto(await user);
  }

  @UseGuards(DisplayGuard)
  @ApiOperation({ summary: "Get Playlist by Display" })
  @ApiResponse({ status: 200, type: GetPlaylistDto })
  @Get(":id/playlist")
  async getPlaylistByDisplay(@Param("id", DisplayExistsPipe) id: string) {
    const display = await this.displayService.findOne(+id);
    const playlist = await display.playlist;
    return new GetPlaylistDto(playlist);
  }

  @UseGuards(DisplayGuard)
  @ApiOperation({
    summary: "Attach playlist to display",
    description:
      "If Any playlist was attached to display - this action rewrite relations",
  })
  @ApiResponse({ status: 200, type: GetPlaylistDto })
  @Put(":id/playlist/:playlistId")
  async attachPlaylist(
    @Param("id", DisplayExistsPipe) id: string,
    @Param("playlistId", PlaylistExistsPipe) playlistId: string
  ) {
    this.displayService.attachPlaylist(id, playlistId);
  }
}
