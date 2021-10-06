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
import { DisplayOwnerGuard } from "src/auth/guards/owner.guards/display.owner.guard";
import { DisplayService } from "./display.service";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";
import { Display } from "./entities/display.entity";
import { GetEventDto } from "src/event/dto/get-event.dto";
import { GetUserDto } from "src/user/dto/get-user.dto";
import { GetPlaylistDto } from "src/playlist/dto/get-playlist.dto";
@ApiBearerAuth()
@ApiTags("Display")
@Controller("displays")
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @UseGuards(CreatorGuards)
  @ApiOperation({
    summary: "Create display",
    description:
      "Create display and attach user to it. Attach display to event",
  })
  @ApiProperty({
    example: Display,
  })
  @ApiResponse({
    status: 201,
    type: Display,
  })
  @Post()
  create(@Body() createDisplayDto: CreateDisplayDto) {
    return this.displayService.create(createDisplayDto);
  }

  @ApiOperation({
    summary: "Return all displays",
    description: "Return displays with author, event, playlist",
  })
  @ApiResponse({
    status: 200,
    type: [Display],
  })
  @Get()
  findAll() {
    return this.displayService.findAll();
  }

  @ApiOperation({
    summary: "Return Display by ID",
    description: "Return displays with author, event, playlist",
  })
  @ApiResponse({
    status: 200,
    type: [Display],
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.displayService.findOne(+id);
  }

  @UseGuards(DisplayOwnerGuard)
  @ApiOperation({
    summary: "Update Display by ID",
    description: "Attach playlist to display",
  })
  @ApiResponse({
    status: 200,
    type: Display,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDisplayDto: UpdateDisplayDto) {
    return this.displayService.update(+id, updateDisplayDto);
  }

  @UseGuards(DisplayOwnerGuard)
  @ApiOperation({
    summary: "Delete display",
    description:
      "Delete display and return true. Return false when display dont exists",
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.displayService.remove(+id);
  }

  @ApiOperation({ summary: "Get event by display" })
  @ApiResponse({
    status: 200,
    type: GetEventDto,
  })
  @Get(":id/event")
  async getEventByDisplay(@Param("id", ParseIntPipe) id: string) {
    const display = await this.displayService.findOne(+id);
    const event = display.event;
    return new GetEventDto(event);
  }

  @ApiOperation({ summary: "Get Author/owner of display" })
  @ApiResponse({
    status: 200,
    type: GetUserDto,
  })
  @Get(":id/user")
  async getUserByDisplay(@Param("id", ParseIntPipe) id: string) {
    const display = await this.displayService.findOne(+id);
    const user = display.author;
    return new GetUserDto(user);
  }

  @ApiOperation({ summary: "Get Playlist by Display" })
  @ApiResponse({
    status: 200,
    type: GetPlaylistDto,
  })
  @Get(":id/playlist")
  async getPlaylistByDisplay(@Param("id", ParseIntPipe) id: string) {
    const display = await this.displayService.findOne(+id);
    const playlist = display.playlist;
    return new GetPlaylistDto(playlist);
  }
}
