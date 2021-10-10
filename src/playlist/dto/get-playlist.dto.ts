import { ApiProperty } from "@nestjs/swagger";
import { Playlist } from "../entities/playlist.entity";
import { ContentToPlaylistDto } from "./content-to-playlist.dto";
import { GetContentToPlaylistDto } from "./get-content-to-playlist.dto";

export class GetPlaylistDto {
  constructor(playlist: Playlist) {
    this.id = playlist.id;
    this.contentToPlaylist = playlist.contentToPlaylist.map(
      (ctp) => new GetContentToPlaylistDto(ctp)
    );
  }

  @ApiProperty({ type: String, example: "1" })
  id: string;

  @ApiProperty({
    type: ContentToPlaylistDto,
    example: ContentToPlaylistDto,
  })
  contentToPlaylist: ContentToPlaylistDto[];
}
