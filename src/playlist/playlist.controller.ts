import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiBearerAuth()
@ApiTags("Playlist oper")
@Controller("displays/:displayid/playlist")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(
    @Param("displayid", ParseIntPipe) diaplayId: string,
    @Body() createPlaylistDto: CreatePlaylistDto
  ) {
    createPlaylistDto.displayId = diaplayId;
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
