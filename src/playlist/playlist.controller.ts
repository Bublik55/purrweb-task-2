import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { Playlist } from "./entities/playlist.entity";
import { PlaylistService } from "./playlist.service";
@ApiBearerAuth()
@ApiTags("Playlist oper")
@Controller("playlists")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}
  @ApiOperation({
    summary: "Create Playlist",
    description:
      "Create Playlist. Attach Playlist To Display.Fill playlist with content",
  })
  @ApiProperty({
    example: Playlist,
  })
  @ApiResponse({
    status: 201,
    type: Playlist,
  })
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const ret = await this.playlistService.create(createPlaylistDto);
    return {
      playlistid: ret.id,
      displayid: (await ret.display).id,
      contentToPlaylist: ret.contentToPlaylist,
    };
  }

  @ApiOperation({
    summary: "Return  playlists",
    description: "Return playlists with authors",
  })
  @ApiResponse({
    status: 200,
    type: [Playlist],
  })
  @Get()
  async findAll() {
    const ret: Playlist[] = await this.playlistService.findAll();
    return ret;
  }

  @ApiOperation({
    summary: "Return  playlist by ID",
    description: "Return playlist",
  })
  @ApiResponse({
    status: 200,
    type: Playlist,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.playlistService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update playlist by ID",
    description: "Set new order and duration  of contentToPlaylist",
  })
  @ApiResponse({
    status: 200,
    type: Playlist,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto
  ) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @ApiOperation({
    summary: "Delete playlist",
    description:
      "Delete playlist -> return true. Return false when playlist dont exists",
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.playlistService.remove(+id);
  }
}
