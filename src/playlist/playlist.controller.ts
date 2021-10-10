import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { PlaylistExistsPipe } from "src/common/pipes/playlist-exists.pipe";
import { PlaylistOwnerGuard } from "src/playlist/guards/playlist.owner.guard";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { GetPlaylistDto } from "./dto/get-playlist.dto";
import { UpdateContentToPlaylistDto } from "./dto/update-contentToPlaylist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { Playlist } from "./entities/playlist.entity";
import { ChangeOrderValidation } from "./pipes/change-order.pipe";
import { PutPlaylistValidation } from "./pipes/create-playlist.pipe";
import { PlaylistService } from "./playlist.service";
@ApiBearerAuth()
@ApiTags("Playlist oper")
@Controller("playlists")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @UseGuards(CreatorGuards)
  @ApiOperation({
    summary: "Create Playlist",
    description:
      "Create Playlist. Attach Playlist To Display.Fill playlist with content",
  })
  @ApiResponse({ status: 201, type: GetPlaylistDto })
  @Post()
  async create(
    @Body(PutPlaylistValidation) createPlaylistDto: CreatePlaylistDto
  ) {
    const playlist = await this.playlistService.create(createPlaylistDto);
    return new GetPlaylistDto(playlist);
  }

  @ApiOperation({
    summary: "Get playlists",
    description: "Get playlists",
  })
  @ApiResponse({ status: 200, type: [GetPlaylistDto] })
  @Get()
  async findAll() {
    const ret: Playlist[] = await this.playlistService.findAll();
    return ret.map((pl) => new GetPlaylistDto(pl));
  }

  @UseGuards(PlaylistOwnerGuard)
  @ApiOperation({
    summary: "Get playlist by ID",
    description: "Get playlist",
  })
  @ApiResponse({
    status: 200,
    type: GetPlaylistDto,
  })
  @Get(":id")
  async findOne(@Param("id", PlaylistExistsPipe) id: string) {
    const obj = await this.playlistService.findOne(+id);
    return new GetPlaylistDto(obj);
  }

  @UseGuards(PlaylistOwnerGuard)
  @ApiOperation({ summary: "Update playlist by ID" })
  @ApiResponse({ status: 200 })
  @Patch(":id")
  async update(
    @Param("id", PlaylistExistsPipe) id: string,
    @Body(PutPlaylistValidation) dto: UpdatePlaylistDto
  ) {
    await this.playlistService.update(+id, dto);
  }

  @UseGuards(PlaylistOwnerGuard)
  @ApiOperation({ summary: "Delete playlist" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.playlistService.remove(+id);
  }

  @UseGuards(PlaylistOwnerGuard)
  @Put(":id/content")
  @ApiOperation({ summary: "Change order and/or duration of content" })
  @ApiResponse({ status: 200 })
  async setNewDurationOrder(
    @Param("id", PlaylistExistsPipe) id: string,
    @Body(ChangeOrderValidation) dto: UpdateContentToPlaylistDto
  ) {
    await this.playlistService.updateContentToPlaylist(id, dto);
  }
}
