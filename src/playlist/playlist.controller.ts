import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { PlaylistService } from "./playlist.service";
@ApiBearerAuth()
@ApiTags("Playlist oper")
@Controller("playlists/")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto
  ) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.playlistService.remove(+id);
  }
}
